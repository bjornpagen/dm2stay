import * as React from "react"
import { Dashboard } from "@/components/dashboard"
import { db } from "@/server/db"
import { getSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { inngest } from "@/inngest/client"
import * as schema from "@/server/db/schema"
import { desc, eq } from "drizzle-orm"
import { AirbnbListingUrl } from "@/lib/utils"

async function importProperty(url: string) {
  "use server"

  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }

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
        userId: session.user.id,
        airbnbId: airbnbListing.airbnbId
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
}

async function DashboardContent() {
  const session = await getSession()
  if (!session) {
    redirect("/")
  }

  const listings = await db
    .select({
      id: schema.listing.id,
      airbnbId: schema.listing.airbnbId,
      airbnbData: schema.airbnbListing.data
    })
    .from(schema.listing)
    .leftJoin(
      schema.airbnbListing,
      eq(schema.listing.airbnbId, schema.airbnbListing.airbnbId)
    )
    .where(eq(schema.listing.userId, session.user.id))
    .orderBy(desc(schema.listing.createdAt))

  return <Dashboard listings={listings} importProperty={importProperty} />
}
export default function DashboardPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-16">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
        Dashboard
      </h1>
      <React.Suspense>
        <DashboardContent />
      </React.Suspense>
    </div>
  )
}
