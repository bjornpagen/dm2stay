import * as React from "react"
import { notFound } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { MessageTimeline } from "@/components/message-timeline"
import { BookingSummary } from "@/components/booking-summary"
import {
  mockCustomerProfile,
  mockMessages,
  mockBookings
} from "@/lib/mock-data"

async function getCustomer(id: string) {
  const customer = mockCustomerProfile
  if (!customer) {
    notFound()
  }
  return customer
}

async function getMessages(id: string) {
  return mockMessages
}

async function getBookings(id: string) {
  return mockBookings
}

export default async function CustomerPage({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = getCustomer(id)
  const messages = getMessages(id)
  const bookings = getBookings(id)

  return (
    <div className="space-y-6 md:space-y-8">
      <React.Suspense>
        <CustomerHeader customer={customer} />
      </React.Suspense>
      <React.Suspense>
        <MessageTimeline messages={messages} />
      </React.Suspense>
      <React.Suspense>
        <BookingSummary bookings={bookings} />
      </React.Suspense>
    </div>
  )
}
