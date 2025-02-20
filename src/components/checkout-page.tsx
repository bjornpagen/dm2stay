"use client"

import * as React from "react"
import { Suspense } from "react"
import { useState } from "react"
import { CheckoutForm } from "@/components/checkout-form"
import { PropertyDetails } from "@/components/property-details"
import { PricingBreakdown } from "@/components/pricing-breakdown"
import type { Booking } from "@/app/(dashboard)/checkout/[id]/page"

export function CheckoutPage(params: {
  booking: Promise<Booking>
}) {
  const booking = React.use(params.booking)
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    booking.checkIn ? new Date(booking.checkIn) : undefined
  )
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    booking.checkOut ? new Date(booking.checkOut) : undefined
  )
  const [guests, setGuests] = useState(1)

  const handleDateChange = (type: "checkIn" | "checkOut", date?: Date) => {
    if (type === "checkIn") {
      setCheckIn(date)
      if (checkOut && date && checkOut <= date) {
        setCheckOut(undefined)
      }
    } else {
      setCheckOut(date)
    }
  }

  const calculateStayDetails = (pricing: {
    perNight: number
    perWeek: number
    perMonth: number
    cleaningFee: number
    serviceFee: number
    taxRate: number
  }) => {
    if (!checkIn || !checkOut) {
      return {
        nights: 0,
        basePrice: 0,
        cleaningFee: pricing.cleaningFee,
        serviceFee: pricing.serviceFee,
        taxes: 0
      }
    }

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )
    const weeks = Math.floor(nights / 7)
    const months = Math.floor(nights / 30)

    let basePrice = 0
    if (months >= 1) {
      const fullMonths = Math.floor(nights / 30)
      const remainingDays = nights % 30
      basePrice =
        fullMonths * pricing.perMonth + remainingDays * (pricing.perMonth / 30)
    } else if (weeks >= 1) {
      const fullWeeks = Math.floor(nights / 7)
      const remainingDays = nights % 7
      basePrice =
        fullWeeks * pricing.perWeek + remainingDays * (pricing.perWeek / 7)
    } else {
      basePrice = nights * pricing.perNight
    }

    const cleaningFee = pricing.cleaningFee
    const serviceFee = pricing.serviceFee
    const subtotal = basePrice + cleaningFee + serviceFee
    const taxes = subtotal * pricing.taxRate

    return {
      nights,
      basePrice,
      cleaningFee,
      serviceFee,
      taxes
    }
  }

  const pricing = {
    perNight: booking.listing.defaultDailyPrice,
    perWeek: booking.listing.defaultWeeklyPrice,
    perMonth: booking.listing.defaultMonthlyPrice,
    cleaningFee: 100,
    serviceFee: 75,
    taxRate: 0.12
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-8">Complete your booking</h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense
            fallback={
              <div className="h-[400px] animate-pulse bg-muted rounded-lg" />
            }
          >
            <BookingForm
              checkIn={checkIn}
              checkOut={checkOut}
              onDateChange={handleDateChange}
              guests={guests}
              onGuestsChange={setGuests}
              prospect={booking.prospect}
            />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-[600px] animate-pulse bg-muted rounded-lg" />
            }
          >
            {booking.listing && (
              <BookingDetails
                property={{
                  id: booking.listing.id,
                  title: booking.listing.data.h1Title,
                  location: booking.listing.data.location.addressTitle ?? "",
                  image: booking.listing.data.overview.imageUrl ?? "",
                  amenities: booking.listing.data.amenities.groups
                    .flatMap((group) => group.amenities)
                    .filter((amenity) => amenity.available)
                    .map((amenity) => amenity.title)
                }}
                booking={{
                  checkIn: checkIn?.toISOString() ?? "",
                  checkOut: checkOut?.toISOString() ?? "",
                  guests
                }}
                pricing={pricing}
                stayDetails={calculateStayDetails(pricing)}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function BookingForm({
  checkIn,
  checkOut,
  onDateChange,
  guests,
  onGuestsChange,
  prospect
}: {
  checkIn: Date | undefined
  checkOut: Date | undefined
  onDateChange: (type: "checkIn" | "checkOut", date?: Date) => void
  guests: number
  onGuestsChange: (guests: number) => void
  prospect: {
    name: string | null
    email: string | null
    phone: string | null
  }
}) {
  return (
    <div className="space-y-6">
      <CheckoutForm
        checkIn={checkIn}
        checkOut={checkOut}
        onDateChange={onDateChange}
        guests={guests}
        onGuestsChange={onGuestsChange}
        prospect={prospect}
      />
    </div>
  )
}

function BookingDetails({
  property,
  booking,
  pricing,
  stayDetails
}: {
  property: {
    id: string
    title: string
    location: string
    image: string
    amenities: string[]
  }
  booking: { checkIn: string; checkOut: string; guests: number }
  pricing: {
    perNight: number
    perWeek: number
    perMonth: number
    cleaningFee: number
    serviceFee: number
    taxRate: number
  }
  stayDetails: {
    nights: number
    basePrice: number
    cleaningFee: number
    serviceFee: number
    taxes: number
  }
}) {
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <PricingBreakdown pricing={pricing} stayDetails={stayDetails} />
      <PropertyDetails property={property} booking={booking} />
    </div>
  )
}
