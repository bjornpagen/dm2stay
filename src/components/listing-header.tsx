"use client"

import { useState } from "react"
import type { Overview } from "@/types/listing"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Bed, Bath, DollarSign } from "lucide-react"
import { ListingPriceEditor } from "@/components/listing-price-editor"

export function ListingHeader({ overview }: { overview: Overview }) {
  const [pricing, setPricing] = useState(overview.pricing)

  const handlePriceUpdate = async (newPrices: {
    perNight: number
    perWeek: number
    perMonth: number
  }) => {
    // TODO: Implement API call to update prices
    console.log("Updating prices:", newPrices)
    setPricing(newPrices)
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">{overview.title}</h1>
        <p className="text-muted-foreground">{overview.location}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <span>{overview.capacity} guests</span>
        </div>
        <div className="flex items-center gap-2">
          <Bed className="w-5 h-5 text-muted-foreground" />
          <span>2 bedrooms</span>
        </div>
        <div className="flex items-center gap-2">
          <Bath className="w-5 h-5 text-muted-foreground" />
          <span>1 bathroom</span>
        </div>
      </div>

      {(overview.rating || overview.reviewCount) && (
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-medium">{overview.rating}</span>
          <span className="text-muted-foreground">
            ({overview.reviewCount} reviews)
          </span>
        </div>
      )}

      {overview.isSuperhost && (
        <Badge variant="secondary" className="mt-2">
          Superhost
        </Badge>
      )}

      {pricing && (
        <div className="relative flex items-center gap-6 mt-4 p-4 bg-accent rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-semibold">${pricing.perNight}</span>
            <span className="text-sm text-muted-foreground">/ night</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-semibold">${pricing.perWeek}</span>
            <span className="text-sm text-muted-foreground">/ week</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-semibold">${pricing.perMonth}</span>
            <span className="text-sm text-muted-foreground">/ month</span>
          </div>
          <ListingPriceEditor pricing={pricing} onSave={handlePriceUpdate} />
        </div>
      )}
    </div>
  )
}
