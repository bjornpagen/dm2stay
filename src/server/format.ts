import type { ListingData } from "@/server/types"
import type * as schema from "@/server/db/schema"

type ProspectInfo = Omit<typeof schema.prospect.$inferSelect, "id">
type BookingInfo = Omit<
  typeof schema.booking.$inferSelect,
  "id" | "stripePaymentIntentId"
>
type ListingInfo = {
  defaultDailyPrice: number | null
  defaultWeeklyPrice: number | null
  defaultMonthlyPrice: number | null
  airbnbData: ListingData
}

export function formatProspectInfo(prospect: ProspectInfo) {
  const info = [
    prospect.name && `Name: ${prospect.name}`,
    prospect.email && `Email: ${prospect.email}`,
    prospect.phone && `Phone: ${prospect.phone}`,
    prospect.instagramHandle && `Instagram: ${prospect.instagramHandle}`,
    prospect.tiktokHandle && `TikTok: ${prospect.tiktokHandle}`
  ]
    .filter(Boolean)
    .join("\n")

  return info.length > 0
    ? `Guest Details:\n${info}`
    : "No guest details provided"
}

export function formatBookingStatus(activeBooking: BookingInfo | undefined) {
  if (!activeBooking) {
    return "No active booking exists. Prompt the guest to provide booking details."
  }
  if (activeBooking.paymentAt) {
    return `Booking completed.
Check-in: ${activeBooking.checkIn}
Check-out: ${activeBooking.checkOut}
Listing: ${activeBooking.listingId}
Payment finished on: ${activeBooking.paymentAt}`
  }
  return `Booking pending payment.
Check-in: ${activeBooking.checkIn}
Check-out: ${activeBooking.checkOut}
Listing: ${activeBooking.listingId}
Complete your booking here: https://example.com/book/${activeBooking.listingId}?checkIn=${activeBooking.checkIn.toISOString()}&checkOut=${activeBooking.checkOut.toISOString()}`
}

export function formatBookingFocus(activeBooking: BookingInfo | undefined) {
  if (!activeBooking) {
    return `1. Collect check-in and check-out dates
2. Gather guest contact information (email and phone)
3. Finalize the booking once all details are confirmed`
  }
  return activeBooking.paymentAt
    ? "Address any questions regarding the confirmed booking"
    : "Guide the guest to complete the pending payment via the checkout link"
}

export function formatListingInfo(listings: ListingInfo[]) {
  if (listings.length === 0) {
    return "No rental properties are available at this time"
  }

  return `Available Rental Properties:
${listings
  .map(
    (listing) => `
Property Information:
${JSON.stringify(listing.airbnbData)}
Pricing Information:
- Daily Price: ${listing.defaultDailyPrice ? `$${listing.defaultDailyPrice / 100}` : "Not set"}
- Weekly Price: ${listing.defaultWeeklyPrice ? `$${listing.defaultWeeklyPrice / 100}` : "Not set"}
- Monthly Price: ${listing.defaultMonthlyPrice ? `$${listing.defaultMonthlyPrice / 100}` : "Not set"}`
  )
  .join("\n\n")}`
}
