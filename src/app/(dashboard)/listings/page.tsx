import * as React from "react"
import { db } from "@/server/db"
import { desc, eq, sql } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { getUserId } from "@/server/auth"
import type { ListingData } from "@/server/types"
import { ListingsPage } from "@/components/listings-page"

const getListings = db
  .select({
    id: schema.listing.id,
    defaultDailyPrice: schema.listing.defaultDailyPrice,
    defaultWeeklyPrice: schema.listing.defaultWeeklyPrice,
    defaultMonthlyPrice: schema.listing.defaultMonthlyPrice,
    data: schema.airbnbListing.data
  })
  .from(schema.listing)
  .leftJoin(
    schema.airbnbListing,
    eq(schema.listing.airbnbId, schema.airbnbListing.airbnbId)
  )
  .where(eq(schema.listing.userId, sql.placeholder("userId")))
  .orderBy(desc(schema.listing.createdAt))
  .prepare("get_listings")

export type Listing = {
  id: string
  defaultDailyPrice: number
  defaultWeeklyPrice: number
  defaultMonthlyPrice: number
  data: ListingData | null
}

export default function Page() {
  const userId = getUserId()
  const listings = userId.then((userId) => getListings.execute({ userId }))

  return (
    <React.Suspense>
      <ListingsPage listings={listings} />
    </React.Suspense>
  )
}
