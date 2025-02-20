import type { ListingData } from "@/server/types"
import type * as schema from "@/server/db/schema"

type ProspectInfo = Omit<typeof schema.prospect.$inferSelect, "id">
type BookingInfo = Omit<
  typeof schema.booking.$inferSelect,
  "id" | "stripePaymentIntentId"
>
type ListingInfo = {
  id: string
  defaultDailyPrice: number
  defaultWeeklyPrice: number
  defaultMonthlyPrice: number
  airbnbData: ListingData | null
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
Guests: ${activeBooking.guestCount}
Listing: ${activeBooking.listingId}
Total Price: ${activeBooking.stickerPrice ? `$${activeBooking.stickerPrice / 100}` : "Not set"}
Payment finished on: ${activeBooking.paymentAt}`
  }
  return `Booking pending payment.
Check-in: ${activeBooking.checkIn}
Check-out: ${activeBooking.checkOut}
Guests: ${activeBooking.guestCount}
Listing: ${activeBooking.listingId}
Total Price: ${activeBooking.stickerPrice ? `$${activeBooking.stickerPrice / 100}` : "Not set"}
Remind the guest of the following steps to complete the booking:
1. Click the checkout link above
2. Fill in your payment details
3. Submit payment to confirm your reservation
Let me know if you need any help with the payment process!`
}

export function formatBookingFocus(activeBooking: BookingInfo | undefined) {
  if (!activeBooking) {
    return `1. Collect check-in and check-out dates
2. Gather guest contact information (email)
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
ID: ${listing.id}
${listing.airbnbData ? JSON.stringify(listing.airbnbData) : "No listing data available, tell the guest to check back in couple minutes."}
Pricing Information:
- Daily Price: ${listing.defaultDailyPrice}
- Weekly Price: ${listing.defaultWeeklyPrice}
- Monthly Price: ${listing.defaultMonthlyPrice}`
  )
  .join("\n\n")}`
}

export function getBookingStatus(booking: {
  checkIn: Date
  checkOut: Date
  paymentAt: Date | null
}) {
  const now = new Date()
  const checkIn = new Date(booking.checkIn)
  const checkOut = new Date(booking.checkOut)

  if (booking.paymentAt === null) {
    return "pending" as const
  }

  if (now > checkOut) {
    return "completed" as const
  }

  if (now >= checkIn && now <= checkOut) {
    return "active" as const
  }

  return "upcoming" as const
}

export const formatPrice = (cents: number) => {
  const dollars = cents / 100
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(dollars)
}
