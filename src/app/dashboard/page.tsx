import * as React from "react"
import { Dashboard } from "@/components/dashboard"
import { db } from "@/server/db"
import { getSession } from "@/server/auth"
import { redirect } from "next/navigation"
import { inngest } from "@/inngest/client"
import * as schema from "@/server/db/schema"

async function importProperty(url: string) {
  "use server"

  const session = await getSession()
  if (!session) {
    throw new Error("Unauthorized")
  }

  await db.insert(schema.listing).values({
    airbnbUrl: url,
    userId: session.user.id
  })

  await inngest.send({
    name: "apify/scrape.queued",
    data: { url }
  })
}

async function DashboardContent() {
  const session = await getSession()
  if (!session) {
    redirect("/")
  }

  const listings = await db.query.listing.findMany({
    where: (listing, { eq }) => eq(listing.userId, session.user.id)
  })

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
