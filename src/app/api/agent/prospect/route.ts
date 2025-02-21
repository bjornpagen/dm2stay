import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq, desc, and, gte, asc } from "drizzle-orm"
import { env } from "@/env"

const requestSchema = z.object({
  phone: z.string(),
  userId: z.string()
})

import type { ListingData } from "@/server/types"
import type { ChatCompletionMessageToolCall } from "openai/resources"

export type ProspectData = {
  prospect: {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    instagramHandle: string | null
    tiktokHandle: string | null
    createdAt: Date
    updatedAt: Date
  }
  previousMessages: {
    source:
      | "ai"
      | "user"
      | "instagram_dm"
      | "tiktok_dm"
      | "email"
      | "sms"
      | "test"
    content: string
    toolCalls: ChatCompletionMessageToolCall[] | null
    createdAt: Date
  }[]
  listings: {
    id: string
    defaultDailyPrice: number
    defaultWeeklyPrice: number
    defaultMonthlyPrice: number
    airbnbData: ListingData | null
  }[]
  activeBooking: {
    createdAt: Date
    updatedAt: Date
    listingId: string | null
    prospectId: string
    checkIn: Date
    checkOut: Date
    paymentAt: Date | null
    stickerPrice: number | null
    guestCount: number
  } | null
  toolCallsHistory: {
    openaiId: string
    functionName: string
    functionArgs: unknown
    result: string
    createdAt: Date
  }[]
}

export async function getProspectDataByPhone(
  phone: string,
  userId: string
): Promise<ProspectData> {
  const prospect = await db
    .insert(schema.prospect)
    .values({
      phone
    })
    .onConflictDoUpdate({
      target: schema.prospect.phone,
      set: {
        updatedAt: new Date()
      },
      where: eq(schema.prospect.phone, phone)
    })
    .returning({
      id: schema.prospect.id,
      name: schema.prospect.name,
      email: schema.prospect.email,
      phone: schema.prospect.phone,
      instagramHandle: schema.prospect.instagramHandle,
      tiktokHandle: schema.prospect.tiktokHandle,
      createdAt: schema.prospect.createdAt,
      updatedAt: schema.prospect.updatedAt
    })
    .then((rows) => rows[0])
  if (!prospect) {
    throw new Error("Failed to upsert prospect")
  }

  const [previousMessages, listings, activeBookingResult, toolCallsHistory] =
    await Promise.all([
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
            eq(schema.message.prospectId, prospect.id),
            eq(schema.message.userId, userId)
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
            eq(schema.booking.prospectId, prospect.id),
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
            eq(schema.toolCall.prospectId, prospect.id),
            eq(schema.toolCall.userId, userId)
          )
        )
        .orderBy(asc(schema.toolCall.createdAt))
    ])

  return {
    prospect,
    previousMessages,
    listings,
    activeBooking: activeBookingResult ?? null,
    toolCallsHistory
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization")
  if (authHeader !== `Bearer ${env.DM2STAY_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { phone, userId } = requestSchema.parse(body)
    const data = await getProspectDataByPhone(phone, userId)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      { status: 500 }
    )
  }
}
