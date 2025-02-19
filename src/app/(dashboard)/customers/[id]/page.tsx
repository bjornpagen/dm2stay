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

async function CustomerProfileSection({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const customer = mockCustomerProfile

  if (!customer) {
    notFound()
  }

  return <CustomerHeader customer={customer} />
}

async function MessagesSection({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const messages = mockMessages

  return <MessageTimeline messages={messages} />
}

async function BookingsSection({
  params
}: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const bookings = mockBookings

  return <BookingSummary bookings={bookings} />
}

export default function CustomerPage({
  params
}: { params: Promise<{ id: string }> }) {
  return (
    <div className="space-y-6 md:space-y-8">
      <React.Suspense>
        <CustomerProfileSection params={params} />
      </React.Suspense>
      <React.Suspense>
        <MessagesSection params={params} />
      </React.Suspense>
      <React.Suspense>
        <BookingsSection params={params} />
      </React.Suspense>
    </div>
  )
}
