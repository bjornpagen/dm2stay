"use client"

import * as React from "react"
import { Suspense } from "react"
import { useState } from "react"
import { useParams } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { PropertyDetails } from "@/components/property-details"
import { PricingBreakdown } from "@/components/pricing-breakdown"
import { notFound } from "next/navigation"

interface Property {
  id: string
  title: string
  location: string
  image: string
  amenities: string[]
}

interface Pricing {
  perNight: number
  perWeek: number
  perMonth: number
  cleaningFee: number
  serviceFee: number
  taxRate: number
}

interface StayDetails {
  nights: number
  basePrice: number
  cleaningFee: number
  serviceFee: number
  taxes: number
}

// This would normally fetch data based on the listing ID
const getMockBookingData = (id: string) => {
  // In a real app, we would fetch this data based on the ID
  return {
    property: {
      id,
      title: "Luxury Villa in South Tyrol",
      location: "Bolzano, Trentino-Alto Adige/South Tyrol, Italy",
      image:
        "https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTc4ODk3MzIwMTc5MTQ2NDM3/original/711b3443-e480-4e29-9085-86062c04073a.jpeg",
      amenities: ["Wi-Fi", "Pool", "Kitchen", "Air conditioning", "Mountain view"],
    },
    pricing: {
      perNight: 250,
      perWeek: 1500, // ~214/night
      perMonth: 5000, // ~167/night
      cleaningFee: 100,
      serviceFee: 75,
      taxRate: 0.12, // 12% tax rate
    },
  }
}

// Separate the data fetching logic
function BookingData({ children }: { children: (data: ReturnType<typeof getMockBookingData>) => React.ReactNode }) {
  const params = useParams()
  const id = params?.id
  
  if (typeof id !== 'string') {
    notFound()
  }

  const mockBookingData = getMockBookingData(id)

  if (!mockBookingData) {
    notFound()
  }

  return <>{children(mockBookingData)}</>
}

// Separate components for Suspense boundaries
function BookingForm({ 
  checkIn, 
  checkOut, 
  onDateChange, 
  guests, 
  onGuestsChange 
}: { 
  checkIn: Date | undefined
  checkOut: Date | undefined
  onDateChange: (type: "checkIn" | "checkOut", date?: Date) => void
  guests: number
  onGuestsChange: (guests: number) => void
}) {
  return (
    <div className="space-y-6">
      <CheckoutForm
        checkIn={checkIn}
        checkOut={checkOut}
        onDateChange={onDateChange}
        guests={guests}
        onGuestsChange={onGuestsChange}
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
  property: Property
  booking: { checkIn: string; checkOut: string; guests: number }
  pricing: Pricing
  stayDetails: StayDetails
}) {
  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <PropertyDetails
        property={property}
        booking={booking}
      />
      <PricingBreakdown pricing={pricing} stayDetails={stayDetails} />
    </div>
  )
}

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  // Consume the params promise
  React.use(params)
  
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState(1)

  const handleDateChange = (type: "checkIn" | "checkOut", date?: Date) => {
    if (type === "checkIn") {
      setCheckIn(date)
      // If check-out is before new check-in, reset it
      if (checkOut && date && checkOut <= date) {
        setCheckOut(undefined)
      }
    } else {
      setCheckOut(date)
    }
  }

  const calculateStayDetails = (pricing: Pricing) => {
    if (!checkIn || !checkOut) {
      return {
        nights: 0,
        basePrice: 0,
        cleaningFee: pricing.cleaningFee,
        serviceFee: pricing.serviceFee,
        taxes: 0,
      }
    }

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    const weeks = Math.floor(nights / 7)
    const months = Math.floor(nights / 30)

    let basePrice = 0
    if (months >= 1) {
      // Use monthly rate
      const fullMonths = Math.floor(nights / 30)
      const remainingDays = nights % 30
      basePrice =
        fullMonths * pricing.perMonth + remainingDays * (pricing.perMonth / 30)
    } else if (weeks >= 1) {
      // Use weekly rate
      const fullWeeks = Math.floor(nights / 7)
      const remainingDays = nights % 7
      basePrice = fullWeeks * pricing.perWeek + remainingDays * (pricing.perWeek / 7)
    } else {
      // Use nightly rate
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
      taxes,
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container px-4 md:px-6">
        <h1 className="text-2xl font-bold mb-8">Complete your booking</h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <Suspense fallback={<div className="h-[400px] animate-pulse bg-muted rounded-lg" />}>
            <BookingForm
              checkIn={checkIn}
              checkOut={checkOut}
              onDateChange={handleDateChange}
              guests={guests}
              onGuestsChange={setGuests}
            />
          </Suspense>
          <Suspense fallback={<div className="h-[600px] animate-pulse bg-muted rounded-lg" />}>
            <BookingData>
              {(bookingData) => {
                const stayDetails = calculateStayDetails(bookingData.pricing)
                return (
                  <BookingDetails
                    property={bookingData.property}
                    booking={{
                      checkIn: checkIn?.toISOString() ?? "",
                      checkOut: checkOut?.toISOString() ?? "",
                      guests,
                    }}
                    pricing={bookingData.pricing}
                    stayDetails={stayDetails}
                  />
                )
              }}
            </BookingData>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

