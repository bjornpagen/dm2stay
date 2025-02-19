import type { Overview } from "@/types/listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

export function ListingOverview({ overview }: { overview: Overview }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{overview.title || 'Listing Title Not Found'}</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-semibold">{overview.propertyType}</p>
          <p className="text-muted-foreground">{overview.location}</p>
          <p className="mt-2">Capacity: {overview.capacity} guests</p>
          {overview.rating && (
            <div className="flex items-center mt-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1 fill-current" />
              <span>{overview.rating.toFixed(1)}</span>
              <span className="text-muted-foreground ml-1">({overview.reviewCount} reviews)</span>
            </div>
          )}
          {overview.isSuperhost && (
            <Badge className="mt-2" variant="secondary">
              Superhost
            </Badge>
          )}
        </div>
        {overview.imageUrl && (
          <div className="relative h-48 md:h-full">
            <Image
              src={overview.imageUrl || "/placeholder.svg"}
              alt={overview.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

