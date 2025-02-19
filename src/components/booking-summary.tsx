"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users } from "lucide-react"
import type { Booking } from "@/app/(dashboard)/customers/[id]/page"

export function BookingSummary(params: { bookings: Promise<Booking[]> }) {
  const bookings = React.use(params.bookings)

  const dummyData = bookings.map((booking) => ({
    ...booking,
    propertyName: "Luxury Villa",
    status: "upcoming" as const,
    paymentStatus: "paid" as const,
    totalAmount: 1500,
    guestCount: 2
  }))

  const statusStyles = {
    completed: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    upcoming: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    cancelled: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
  }

  const paymentStatusStyles = {
    paid: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    partially_paid: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    pending: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    refunded: "bg-red-500/10 text-red-500 hover:bg-red-500/20"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {dummyData.map((booking, index) => (
            <div
              key={booking.id}
              className={`space-y-3 sm:space-y-4 ${
                index < dummyData.length - 1
                  ? "pb-4 sm:pb-6 border-b border-border"
                  : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                <div className="space-y-1">
                  <h3 className="font-semibold text-base sm:text-lg">
                    {booking.propertyName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-wrap">
                      {booking.checkIn.toLocaleDateString()} →{" "}
                      {booking.checkOut.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 flex-shrink-0" />
                    <span>{booking.guestCount} guests</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-semibold">
                    ${booking.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className={statusStyles[booking.status]}
                >
                  {booking.status}
                </Badge>
                <Badge
                  variant="secondary"
                  className={paymentStatusStyles[booking.paymentStatus]}
                >
                  {booking.paymentStatus.replace("_", " ")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
