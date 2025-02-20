import { inngest } from "@/inngest/client"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq, and, isNull } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"
import { env } from "@/env"

export const storeGuestInfo = inngest.createFunction(
  { id: "agent-store-guest-info" },
  { event: "agent/guest.store" },
  async ({ event }) => {
    const { prospectId, name, email } = event.data

    await db
      .update(schema.prospect)
      .set({
        name: name ?? undefined,
        email: email ?? undefined
      })
      .where(eq(schema.prospect.id, prospectId))

    return { success: true }
  }
)

export const createBookingIntent = inngest.createFunction(
  { id: "agent-create-booking-intent" },
  { event: "agent/booking.create" },
  async ({ event }) => {
    const { prospectId, listingId, checkIn, checkOut } = event.data

    const listing = await db
      .select({
        userId: schema.listing.userId
      })
      .from(schema.listing)
      .where(eq(schema.listing.id, listingId))
      .limit(1)
      .then((rows) => rows[0])
    if (!listing) {
      throw new Error("Listing not found")
    }

    const booking = await db
      .insert(schema.booking)
      .values({
        prospectId,
        listingId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut)
      })
      .onConflictDoUpdate({
        target: schema.booking.id,
        where: and(
          eq(schema.booking.prospectId, prospectId),
          eq(schema.booking.listingId, listingId),
          isNull(schema.booking.paymentAt)
        ),
        set: {
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          updatedAt: new Date()
        }
      })
      .returning({
        id: schema.booking.id
      })
      .then((rows) => rows[0])

    if (!booking) {
      throw new Error("Failed to create booking")
    }

    const baseUrl = env.VERCEL_URL
      ? `https://${env.VERCEL_URL}`
      : "http://localhost:3000"
    const checkoutUrl = `${baseUrl}/checkout/${booking.id}`

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

    return { success: true }
  }
)
