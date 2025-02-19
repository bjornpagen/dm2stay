import * as React from "react"
import { db } from "@/server/db"
import { eq, sql, and } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { ListingDetails } from "@/components/listing-details"
import { getUserId } from "@/server/auth"
import { redirect } from "next/navigation"

const getListing = db
  .select({
    id: schema.listing.id,
    userId: schema.listing.userId,
    airbnbId: schema.listing.airbnbId,
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
  .where(
    and(
      eq(schema.listing.id, sql.placeholder("listingId")),
      eq(schema.listing.userId, sql.placeholder("userId"))
    )
  )
  .limit(1)
  .prepare("get_listing")

const getBookings = db
  .select({
    id: schema.booking.id,
    checkIn: schema.booking.checkIn,
    checkOut: schema.booking.checkOut,
    paymentAt: schema.booking.paymentAt,
    createdAt: schema.booking.createdAt,
    prospectId: schema.booking.prospectId,
    prospectName: schema.prospect.name
  })
  .from(schema.booking)
  .leftJoin(schema.prospect, eq(schema.booking.prospectId, schema.prospect.id))
  .where(eq(schema.booking.listingId, sql.placeholder("listingId")))
  .prepare("get_listing_bookings")

export type Listing = Awaited<ReturnType<typeof getListing.execute>>[number]
export type Booking = Awaited<ReturnType<typeof getBookings.execute>>[number]

export default function ListingPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const listingId = params.then((params) => params.id)
  const userId = getUserId()

  const listing = Promise.all([listingId, userId]).then(([listingId, userId]) =>
    getListing
      .execute({ listingId, userId })
      .then((results) => results[0])
      .then((listing) => {
        if (!listing) {
          redirect("/listings")
        }
        return listing
      })
  )
  const bookings = listingId.then((listingId) =>
    getBookings.execute({ listingId })
  )

  return (
    <div className="w-full space-y-8">
      <React.Suspense>
        <ListingDetails listing={listing} bookings={bookings} />
      </React.Suspense>
    </div>
  )
}
