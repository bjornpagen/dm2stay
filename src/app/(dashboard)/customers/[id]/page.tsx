import { notFound } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { MessageTimeline } from "@/components/message-timeline"
import { BookingSummary } from "@/components/booking-summary"
import { mockCustomerProfile, mockMessages, mockBookings } from "@/lib/mock-data"
import { Suspense } from "react"

export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)

  // In a real app, we would fetch this data based on the ID
  const customerProfile = mockCustomerProfile
  const messages = mockMessages
  const bookings = mockBookings

  if (!mockCustomerProfile) {
    notFound()
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <Suspense>
        <CustomerHeader customer={customerProfile} />
      </Suspense>
      <Suspense>
        <MessageTimeline messages={messages} />
      </Suspense>
      <Suspense>
        <BookingSummary bookings={bookings} />
      </Suspense>
    </div>
  )
}

