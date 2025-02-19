import * as React from "react"
import { notFound } from "next/navigation"
import { CustomerHeader } from "@/components/customer-header"
import { MessageTimeline } from "@/components/message-timeline"
import { BookingSummary } from "@/components/booking-summary"
import { extractPromiseField } from "@/lib/utils"
import {
  mockCustomerProfile,
  mockMessages,
  mockBookings
} from "@/lib/mock-data"

async function getCustomer(id: Promise<string>) {
  const customer = mockCustomerProfile
  if (!customer) {
    notFound()
  }
  return customer
}

async function getMessages(id: Promise<string>) {
  return mockMessages
}

async function getBookings(id: Promise<string>) {
  return mockBookings
}

export default function CustomerPage({
  params
}: { params: Promise<{ id: string }> }) {
  const id = extractPromiseField(params, "id")
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
