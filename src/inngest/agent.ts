import { inngest } from "@/inngest/client"
import { openai, OPENAI_DEFAULT_MODEL } from "@/server/openai"
import { db } from "@/server/db"
import { eq, desc, and, ne, gte, asc } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import type {
  ChatCompletionMessageToolCall,
  ChatCompletionTool
} from "openai/resources/chat/completions"
import { createId } from "@paralleldrive/cuid2"
import {
  formatBookingStatus,
  formatBookingFocus,
  formatProspectInfo,
  formatListingInfo
} from "@/server/format"
import { storeGuestInfo, createBookingIntent } from "@/inngest/guest"

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
        "Create a booking intent and automatically send the checkout link to the guest. The link will be sent both through the conversation and via email if the guest's email is set. This is safe to call multiple times.",
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
  async ({ event, step }) => {
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
        .where(eq(schema.prospect.id, message.prospectId))
        .limit(1)
        .then((rows) => rows[0]),
      db
        .select({
          source: schema.message.source,
          content: schema.message.content,
          toolCalls: schema.message.toolCalls,
          createdAt: schema.message.createdAt
        })
        .from(schema.message)
        .where(
          and(
            eq(schema.message.prospectId, message.prospectId),
            eq(schema.message.userId, message.userId),
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
        .where(eq(schema.listing.userId, message.userId))
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
            eq(schema.booking.prospectId, message.prospectId),
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
            eq(schema.toolCall.prospectId, message.prospectId),
            eq(schema.toolCall.userId, message.userId)
          )
        )
        .orderBy(asc(schema.toolCall.createdAt))
    ])
    if (!prospect) {
      throw new Error("Prospect not found")
    }

    const systemMessage = {
      role: "system" as const,
      content: `You are a vacation rental booking assistant focused on guiding guests to successful bookings while providing excellent service. Balance being helpful with encouraging action.

[GUEST INFO]
${formatProspectInfo(prospect)}

[PROPERTY${listings.length === 1 ? "" : " OPTIONS"}]
${formatListingInfo(listings)}${listings.length === 1 ? "\nThis is our featured property with limited availability." : "\nEach property offers a unique experience for our guests."}

[BOOKING STATUS]
${formatBookingStatus(activeBooking)}

[NEXT STEPS]
${formatBookingFocus(activeBooking)}

CRITICAL RESPONSE REQUIREMENTS:
1. ALWAYS send exactly 2-3 separate messages - no exceptions
2. NEVER use emojis under any circumstances
3. Keep each message under 160 characters
4. Use exactly one line break between messages
5. No message grouping or batching - each thought must be its own message
6. NEVER send links manually - booking links are handled automatically by the tools
7. If a link needs to be re-sent, call the createBookingIntentAndSendCheckoutLink tool with the same parameters
8. Try to collect guest name and email using storeGuestInfo before sending booking links when possible

GUEST INFO COLLECTION:
- If name or email is missing, naturally work it into the conversation
- Use storeGuestInfo tool when guest provides their information
- Don't be pushy about collecting info - keep it conversational
- Always proceed with booking link if guest is ready, regardless of info status

MESSAGE STRUCTURE:
- First message: Key information or answer
- Second message: Next step or call-to-action
- Optional third message: Support or additional detail

COMMUNICATION PRIORITIES:
1. Build trust through expertise and transparency
2. Collect guest contact info naturally when possible
3. Guide naturally toward booking completion
4. Create appropriate urgency through value
5. Make the booking process feel simple
6. Address concerns while maintaining momentum

STYLE GUIDELINES:
- Professional and warm
- Clear and specific
- Solution-focused
- Confidence-building
- Direct but not pushy

AVOID:
- Single messages (always send at least 2)
- More than 3 messages
- Any use of emoji
- Vague or indirect language
- Aggressive sales tactics
- Manually sending any links or URLs`
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
        tool_calls: msg.toolCalls as
          | ChatCompletionMessageToolCall[]
          | undefined,
        createdAt: msg.createdAt
      })),
      ...toolCallsHistory.map((tc) => ({
        role: "tool" as const,
        tool_call_id: tc.openaiId,
        content: `${tc.functionName}: args ${JSON.stringify(tc.functionArgs)} returned ${tc.result}`,
        createdAt: tc.createdAt
      })),
      {
        role: "user" as const,
        content: message.content,
        createdAt: message.createdAt
      }
    ].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )

    console.log(JSON.stringify(conversationHistory, null, 2))

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

    if (aiMessage.tool_calls?.length) {
      await db.insert(schema.message).values({
        source: "ai" as const,
        content: aiMessage.content ?? "",
        prospectId: prospect.id,
        userId: message.userId,
        toolCalls: aiMessage.tool_calls
      })

      await db.insert(schema.toolCall).values(
        aiMessage.tool_calls.map((toolCall) => ({
          openaiId: toolCall.id,
          prospectId: prospect.id,
          userId: message.userId,
          functionName: toolCall.function.name,
          functionArgs: JSON.parse(toolCall.function.arguments),
          result: "Tool called successfully"
        }))
      )

      const results = await Promise.all(
        aiMessage.tool_calls.map(async (toolCall) => {
          if (toolCall.type !== "function") {
            throw new Error(`Unexpected tool call type: ${toolCall.type}`)
          }

          const args = JSON.parse(toolCall.function.arguments)
          switch (toolCall.function.name) {
            case "storeGuestInfo": {
              await step.invoke("store-guest-info", {
                function: storeGuestInfo,
                data: {
                  prospectId: prospect.id,
                  name: args.name,
                  email: args.email
                }
              })
              return "Guest info updated"
            }
            case "createBookingIntentAndSendCheckoutLink": {
              await step.invoke("create-booking-intent", {
                function: createBookingIntent,
                data: {
                  prospectId: prospect.id,
                  listingId: args.listingId,
                  checkIn: args.checkIn,
                  checkOut: args.checkOut
                }
              })
              return "Booking intent created and checkout link sent"
            }
            default:
              throw new Error(
                `Unexpected function call: ${toolCall.function.name}`
              )
          }
        })
      )

      if (results.length !== aiMessage.tool_calls.length) {
        throw new Error("Tool results length mismatch")
      }

      await inngest.send({
        name: "agent/message.generated",
        data: { messageIds: [messageId] }
      })

      return inngest.send({
        name: "agent/message.received",
        data: { messageId }
      })
    }

    const aiMessages = aiMessage.content
      ? parseAiMessages(aiMessage.content)
      : []

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
