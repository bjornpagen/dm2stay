"use client"
import { useState } from "react"
import type { ListingData } from "@/server/types"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Bed, Bath, DollarSign } from "lucide-react"
import { ListingPriceEditor } from "@/components/listing-price-editor"

interface ListingHeaderProps {
  overview: ListingData["overview"]
}

export function ListingHeader({ overview }: ListingHeaderProps) {
  const [pricing, setPricing] = useState({
    perNight: 0,
    perWeek: 0,
    perMonth: 0
  })

  const handlePriceUpdate = async (newPrices: {
    perNight: number
    perWeek: number
    perMonth: number
  }) => {
    console.log("Updating prices:", newPrices)
    setPricing(newPrices)
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">
            {overview.title.split(" · ")[0]}
          </h1>
          {overview.title.includes(" · ") && (
            <p className="text-xl text-muted-foreground">
              {overview.title.split(" · ").slice(1).join(" · ")}
            </p>
          )}
        </div>
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
