import { inngest } from "@/inngest/client"
import { openai, OPENAI_DEFAULT_MODEL } from "@/server/openai"
import { db } from "@/server/db"
import { eq, desc, and, ne, gte, asc, isNull } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import type {
  ChatCompletionMessageToolCall,
  ChatCompletionTool
} from "openai/resources/chat/completions"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod"
import {
  formatBookingStatus,
  formatBookingFocus,
  formatProspectInfo,
  formatListingInfo
} from "@/server/format"
import { env } from "@/env"

const storeGuestInfoSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable()
})

const createBookingIntentSchema = z.object({
  listingId: z.string(),
  checkIn: z.string(),
  checkOut: z.string()
})

type StoreGuestInfoArgs = z.infer<typeof storeGuestInfoSchema>
type CreateBookingIntentArgs = z.infer<typeof createBookingIntentSchema>

async function handleStoreGuestInfo(
  args: StoreGuestInfoArgs,
  prospectId: string
) {
  await db
    .update(schema.prospect)
    .set({
      name: args.name ?? undefined,
      email: args.email ?? undefined
    })
    .where(eq(schema.prospect.id, prospectId))

  return "Guest info updated"
}

async function handleCreateBookingIntent(
  args: CreateBookingIntentArgs,
  prospectId: string
) {
  const listing = await db
    .select({
      userId: schema.listing.userId
    })
    .from(schema.listing)
    .where(eq(schema.listing.id, args.listingId))
    .limit(1)
    .then((rows) => rows[0])
  if (!listing) {
    throw new Error("Listing not found")
  }

  const booking = await db
    .insert(schema.booking)
    .values({
      prospectId,
      listingId: args.listingId,
      checkIn: new Date(args.checkIn),
      checkOut: new Date(args.checkOut)
    })
    .onConflictDoUpdate({
      target: [schema.booking.prospectId, schema.booking.listingId],
      where: isNull(schema.booking.paymentAt),
      set: {
        checkIn: new Date(args.checkIn),
        checkOut: new Date(args.checkOut),
        updatedAt: new Date()
      }
    })
    .returning()
    .then((rows) => rows[0])
  if (!booking) {
    throw new Error("Failed to create booking")
  }

  const baseUrl = env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : "http://localhost:3000"
  const checkoutUrl = `${baseUrl}/checkout/${booking.listingId}`

  const messageId = createId()
  await db.insert(schema.message).values({
    id: messageId,
    source: "ai",
    content: checkoutUrl,
    prospectId: prospectId,
    userId: listing.userId
  })

  await inngest.send({
    name: "agent/message.generated",
    data: { messageIds: [messageId] }
  })

  return "Booking intent created and checkout link sent"
}

async function handleToolCalls(
  toolCalls: ChatCompletionMessageToolCall[],
  prospectId: string
) {
  return Promise.all(
    toolCalls.map(async (toolCall) => {
      if (toolCall.type !== "function") {
        throw new Error(`Unexpected tool call type: ${toolCall.type}`)
      }

      const rawArgs = JSON.parse(toolCall.function.arguments)
      switch (toolCall.function.name) {
        case "storeGuestInfo": {
          const result = storeGuestInfoSchema.safeParse(rawArgs)
          if (!result.success) {
            throw new Error(
              `Invalid storeGuestInfo args: ${result.error.message}`
            )
          }
          return handleStoreGuestInfo(result.data, prospectId)
        }
        case "createBookingIntentAndSendCheckoutLink": {
          const result = createBookingIntentSchema.safeParse(rawArgs)
          if (!result.success) {
            throw new Error(
              `Invalid createBookingIntent args: ${result.error.message}`
            )
          }
          return handleCreateBookingIntent(result.data, prospectId)
        }
        default:
          throw new Error(`Unexpected function call: ${toolCall.function.name}`)
      }
    })
  )
}

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "storeGuestInfo",
      description: "Store or update guest contact information",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: ["string", "null"],
            description: "Guest's full name if provided"
          },
          email: {
            type: ["string", "null"],
            description: "Guest's email address"
          }
        },
        required: ["name", "email"],
        additionalProperties: false
      },
      strict: true
    }
  },
  {
    type: "function",
    function: {
      name: "createBookingIntentAndSendCheckoutLink",
      description:
        "Create a booking intent (not yet confirmed until payment) and send a checkout link to the guest",
      parameters: {
        type: "object",
        properties: {
          listingId: {
            type: "string",
            description: "The selected listing ID"
          },
          checkIn: {
            type: "string",
            description: "Check-in date in ISO format"
          },
          checkOut: {
            type: "string",
            description: "Check-out date in ISO format"
          }
        },
        required: ["listingId", "checkIn", "checkOut"],
        additionalProperties: false
      },
      strict: true
    }
  }
]

export const messageReceived = inngest.createFunction(
  { id: "agent-message-received" },
  { event: "agent/message.received" },
  async ({ event }) => {
    const { messageId } = event.data

    const message = await db
      .select({
        prospectId: schema.message.prospectId,
        userId: schema.message.userId,
        content: schema.message.content,
        createdAt: schema.message.createdAt
      })
      .from(schema.message)
      .where(eq(schema.message.id, messageId))
      .limit(1)
      .then((rows) => rows[0])
    if (!message) {
      throw new Error("Message not found")
    }
    const { prospectId, userId, content, createdAt } = message

    const [
      prospect,
      previousMessages,
      listings,
      activeBooking,
      toolCallsHistory
    ] = await Promise.all([
      db
        .select({
          id: schema.prospect.id,
          name: schema.prospect.name,
          email: schema.prospect.email,
          phone: schema.prospect.phone,
          instagramHandle: schema.prospect.instagramHandle,
          tiktokHandle: schema.prospect.tiktokHandle,
          createdAt: schema.prospect.createdAt,
          updatedAt: schema.prospect.updatedAt
        })
        .from(schema.prospect)
        .where(eq(schema.prospect.id, prospectId))
        .limit(1)
        .then((rows) => rows[0]),
      db
        .select({
          source: schema.message.source,
          content: schema.message.content,
          createdAt: schema.message.createdAt
        })
        .from(schema.message)
        .where(
          and(
            eq(schema.message.prospectId, prospectId),
            eq(schema.message.userId, userId),
            ne(schema.message.id, messageId)
          )
        )
        .orderBy(asc(schema.message.createdAt)),
      db
        .select({
          id: schema.listing.id,
          defaultDailyPrice: schema.listing.defaultDailyPrice,
          defaultWeeklyPrice: schema.listing.defaultWeeklyPrice,
          defaultMonthlyPrice: schema.listing.defaultMonthlyPrice,
          airbnbData: schema.airbnbListing.data
        })
        .from(schema.listing)
        .where(eq(schema.listing.userId, userId))
        .innerJoin(
          schema.airbnbListing,
          eq(schema.listing.airbnbId, schema.airbnbListing.airbnbId)
        )
        .orderBy(desc(schema.listing.createdAt)),
      db
        .select({
          createdAt: schema.booking.createdAt,
          updatedAt: schema.booking.updatedAt,
          listingId: schema.booking.listingId,
          prospectId: schema.booking.prospectId,
          checkIn: schema.booking.checkIn,
          checkOut: schema.booking.checkOut,
          paymentAt: schema.booking.paymentAt,
          stickerPrice: schema.booking.stickerPrice,
          guestCount: schema.booking.guestCount
        })
        .from(schema.booking)
        .where(
          and(
            eq(schema.booking.prospectId, prospectId),
            gte(
              schema.booking.createdAt,
              new Date(Date.now() - 24 * 60 * 60 * 1000)
            )
          )
        )
        .orderBy(desc(schema.booking.createdAt))
        .limit(1)
        .then((rows) => rows[0]),
      db
        .select({
          openaiId: schema.toolCall.openaiId,
          functionName: schema.toolCall.functionName,
          functionArgs: schema.toolCall.functionArgs,
          result: schema.toolCall.result,
          createdAt: schema.toolCall.createdAt
        })
        .from(schema.toolCall)
        .where(
          and(
            eq(schema.toolCall.prospectId, prospectId),
            eq(schema.toolCall.userId, userId)
          )
        )
        .orderBy(asc(schema.toolCall.createdAt))
    ])
    if (!prospect) {
      throw new Error("Prospect not found")
    }

    const systemMessage = {
      role: "system" as const,
      content: `You are a vacation rental booking assistant. Your role is to assist guests in making a booking for a vacation rental.

[GUEST INFO]
${formatProspectInfo(prospect)}

[AVAILABLE PROPERTIES]
${formatListingInfo(listings)}

[BOOKING STATUS]
${formatBookingStatus(activeBooking)}

[NEXT STEPS]
${formatBookingFocus(activeBooking)}

When booking details are provided, immediately invoke finalizeBooking to record the booking.
Respond in a friendly, natural manner, as in a real conversation. When needed, split your response into multiple short messages using a single newline "\\n" solely for message separation.`
    }

    const conversationHistory = [
      ...previousMessages.map((msg) => ({
        role:
          msg.source === "instagram_dm" ||
          msg.source === "tiktok_dm" ||
          msg.source === "email" ||
          msg.source === "sms" ||
          msg.source === "test"
            ? ("user" as const)
            : ("assistant" as const),
        content: msg.content,
        createdAt: msg.createdAt
      })),
      ...toolCallsHistory.map((tc) => ({
        role: "tool" as const,
        tool_call_id: tc.openaiId,
        content: `${tc.functionName}: args ${JSON.stringify(tc.functionArgs)} returned ${tc.result}`,
        createdAt: tc.createdAt
      })),
      { role: "user" as const, content, createdAt }
    ].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    const messages = [systemMessage, ...conversationHistory]

    const response = await openai.chat.completions.create({
      model: OPENAI_DEFAULT_MODEL,
      messages,
      tools,
      tool_choice: "auto"
    })

    if (!response.choices || !response.choices[0]) {
      throw new Error("OpenAI returned no choices")
    }

    const aiMessage = response.choices[0].message
    if (!aiMessage) {
      throw new Error("No response from OpenAI")
    }

    const parseAiMessages = (content: string) =>
      content
        .split("\n")
        .map((m) => m.trim())
        .filter((m) => m.length > 0)
        .map((content) => ({
          role: "assistant" as const,
          content
        }))

    const aiMessages = aiMessage.content
      ? parseAiMessages(aiMessage.content)
      : []

    if (aiMessage.tool_calls?.length) {
      const toolResults = await handleToolCalls(
        aiMessage.tool_calls,
        prospect.id
      )
      if (toolResults.length !== aiMessage.tool_calls.length) {
        throw new Error("Tool results length mismatch")
      }

      await db.insert(schema.toolCall).values(
        aiMessage.tool_calls.map((toolCall, i) => ({
          openaiId: toolCall.id,
          prospectId: prospect.id,
          userId: message.userId,
          functionName: toolCall.function.name,
          functionArgs: JSON.parse(toolCall.function.arguments),
          result: toolResults[i] ?? "Error: No result"
        }))
      )

      return await inngest.send({
        name: "agent/message.received",
        data: { messageId: event.data.messageId }
      })
    }

    if (aiMessages.length === 0) {
      throw new Error("No messages generated")
    }

    const messageIds = aiMessages.map(() => createId())

    await db.insert(schema.message).values(
      aiMessages.map((msg, i) => ({
        id: messageIds[i],
        source: "ai" as const,
        content: msg.content,
        prospectId: message.prospectId,
        userId: message.userId
      }))
    )

    return inngest.send({
      name: "agent/message.generated",
      data: { messageIds }
    })
  }
)
