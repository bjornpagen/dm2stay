"use server"

import { db } from "@/server/db"
import { getUserId } from "@/server/auth"
import { inngest } from "@/inngest/client"
import * as schema from "@/server/db/schema"

import { AirbnbListingUrl } from "@/lib/utils"

export async function importAirbnbListing(url: string) {
  const userId = await getUserId()
  const { airbnbId } = AirbnbListingUrl.parse(url)

  await db.transaction(async (tx) => {
    const airbnbListing = await tx
      .insert(schema.airbnbListing)
      .values({
        airbnbId
      })
      .onConflictDoUpdate({
        target: schema.airbnbListing.airbnbId,
        set: { updatedAt: new Date() }
      })
      .returning()
      .then((result) => result[0])
    if (!airbnbListing) {
      throw new Error("Failed to create Airbnb listing")
    }

    await tx
      .insert(schema.listing)
      .values({
        userId,
        airbnbId
      })
      .onConflictDoUpdate({
        target: [schema.listing.userId, schema.listing.airbnbId],
        set: { updatedAt: new Date() }
      })

    await inngest.send({
      name: "apify/scrape.queued",
      data: { airbnbId }
    })
  })

  return { success: true }
}
