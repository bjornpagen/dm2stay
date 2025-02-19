import { Card } from "@/components/ui/card"
import { ArrowUpRight, Star } from "lucide-react"

interface Property {
  name: string
  revenue: number
  occupancy: number
  rating: number
}

export function TopProperties({ properties }: { properties: Property[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Performing Listings</h3>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.name}
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div>
              <p className="font-medium">{property.name}</p>
              <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                <span>${property.revenue.toLocaleString()}</span>
                <span>{property.occupancy}% occupied</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  {property.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
