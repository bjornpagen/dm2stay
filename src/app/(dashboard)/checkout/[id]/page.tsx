import * as React from "react"
import { db } from "@/server/db"
import { eq, sql, and, isNotNull } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { CheckoutPage } from "@/components/checkout-page"
import { redirect } from "next/navigation"

const getBooking = db
  .select({
    id: schema.booking.id,
    checkIn: schema.booking.checkIn,
    checkOut: schema.booking.checkOut,
    prospectId: schema.booking.prospectId,
    listingId: schema.booking.listingId,
    paymentAt: schema.booking.paymentAt,
    stickerPrice: schema.booking.stickerPrice,
    guestCount: schema.booking.guestCount,
    prospect: {
      name: schema.prospect.name,
      email: schema.prospect.email,
      phone: schema.prospect.phone
    },
    listing: {
      id: schema.listing.id,
      defaultDailyPrice: schema.listing.defaultDailyPrice,
      defaultWeeklyPrice: schema.listing.defaultWeeklyPrice,
      defaultMonthlyPrice: schema.listing.defaultMonthlyPrice,
      data: schema.airbnbListing.data
    }
  })
  .from(schema.booking)
  .innerJoin(schema.listing, eq(schema.booking.listingId, schema.listing.id))
  .innerJoin(
    schema.airbnbListing,
    eq(schema.listing.airbnbId, schema.airbnbListing.airbnbId)
  )
  .innerJoin(schema.prospect, eq(schema.booking.prospectId, schema.prospect.id))
  .where(
    and(
      eq(schema.booking.id, sql.placeholder("bookingId")),
      isNotNull(schema.airbnbListing.data)
    )
  )
  .limit(1)
  .prepare("get_booking")

export type Booking = Awaited<ReturnType<typeof getBooking.execute>>[number]

export default function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const bookingId = params.then((params) => params.id)

  const booking = bookingId.then((bookingId) =>
    getBooking
      .execute({ bookingId })
      .then((results) => results[0])
      .then((booking) => {
        if (!booking) {
          redirect("/listings")
        }
        return booking
      })
  )

  return (
    <React.Suspense>
      <CheckoutPage booking={booking} />
    </React.Suspense>
  )
}
