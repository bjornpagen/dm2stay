import * as React from "react"
import { db } from "@/server/db"
import { eq, desc, sql, and, asc } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { getUserId } from "@/server/auth"

import { CustomerHeader } from "@/components/customer-header"
import { MessageTimeline } from "@/components/message-timeline"
import { BookingSummary } from "@/components/booking-summary"
import { redirect } from "next/navigation"

const getCustomer = db
  .select({
    id: schema.prospect.id,
    name: schema.prospect.name,
    email: schema.prospect.email,
    phone: schema.prospect.phone,
    instagramHandle: schema.prospect.instagramHandle,
    tiktokHandle: schema.prospect.tiktokHandle,
    createdAt: schema.prospect.createdAt
  })
  .from(schema.prospect)
  .where(eq(schema.prospect.id, sql.placeholder("prospectId")))
  .limit(1)
  .prepare("get_customer")

const getMessages = db
  .select({
    id: schema.message.id,
    content: schema.message.content,
    source: schema.message.source,
    createdAt: schema.message.createdAt
  })
  .from(schema.message)
  .where(
    and(
      eq(schema.message.prospectId, sql.placeholder("prospectId")),
      eq(schema.message.userId, sql.placeholder("userId"))
    )
  )
  .orderBy(asc(schema.message.createdAt))
  .prepare("get_messages")

const getBookings = db
  .select({
    id: schema.booking.id,
    checkIn: schema.booking.checkIn,
    checkOut: schema.booking.checkOut,
    listingId: schema.booking.listingId,
    paymentAt: schema.booking.paymentAt,
    createdAt: schema.booking.createdAt
  })
  .from(schema.booking)
  .where(eq(schema.booking.prospectId, sql.placeholder("prospectId")))
  .orderBy(desc(schema.booking.checkIn))
  .prepare("get_bookings")

export type Customer = Awaited<ReturnType<typeof getCustomer.execute>>[number]
export type Message = Awaited<ReturnType<typeof getMessages.execute>>[number]
export type Booking = Awaited<ReturnType<typeof getBookings.execute>>[number]

export default function CustomerPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const prospectId = params.then((params) => params.id)
  const userId = getUserId()

  const customer = prospectId.then((prospectId) =>
    getCustomer
      .execute({ prospectId })
      .then((result) => result[0])
      .then((customer) => {
        if (!customer) {
          redirect("/customers")
        }
        return customer
      })
  )
  const messages = Promise.all([prospectId, userId]).then(
    ([prospectId, userId]) => getMessages.execute({ prospectId, userId })
  )
  const bookings = prospectId.then((prospectId) =>
    getBookings.execute({ prospectId })
  )

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
