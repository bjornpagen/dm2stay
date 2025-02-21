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
    return `Ready to help find the perfect dates for your stay.
Key priorities:
- Understand guest preferences and timeline
- Present relevant availability and rates
- Guide toward a confident booking decision`
  }

  if (activeBooking.paymentAt) {
    return `Booking confirmed and secured.
Check-in: ${activeBooking.checkIn}
Check-out: ${activeBooking.checkOut}
Guests: ${activeBooking.guestCount}
Total: $${activeBooking.stickerPrice ? formatPrice(activeBooking.stickerPrice) : "Not set"}
Focus on building excitement and providing arrival details.`
  }

  return `Booking in progress.
Check-in: ${activeBooking.checkIn}
Check-out: ${activeBooking.checkOut}
Guests: ${activeBooking.guestCount}
Total: $${activeBooking.stickerPrice ? formatPrice(activeBooking.stickerPrice) : "Not set"}

Priority: Guide to completion while addressing any questions.
Note: Dates are temporarily held pending payment confirmation.`
}

export function formatBookingFocus(activeBooking: BookingInfo | undefined) {
  if (!activeBooking) {
    return `Guide guest journey:
- Understand their needs and timeline
- Share relevant property details and availability
- Make booking process clear and appealing
- Highlight unique value and amenities`
  }

  return activeBooking.paymentAt
    ? `Support confirmed booking:
- Share excitement for their upcoming stay
- Offer to answer any pre-arrival questions
- Provide relevant property and area details`
    : `Focus on booking completion:
- Your secure checkout link is powered by Stripe, a trusted global payment platform
- All payment information is encrypted and processed securely
- Reinforce value and amenities
- Create natural urgency through limited availability`
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
