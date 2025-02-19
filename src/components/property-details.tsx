import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Wifi, PocketIcon as Pool, UtensilsCrossed, Wind, Mountain } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  Pool: Pool,
  Kitchen: UtensilsCrossed,
  "Air conditioning": Wind,
  "Mountain view": Mountain,
}

interface PropertyDetailsProps {
  property: {
    title: string
    location: string
    image: string
    amenities: string[]
  }
  booking: {
    checkIn: string
    checkOut: string
    guests: number
  }
}

export function PropertyDetails({ property, booking }: PropertyDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{property.title}</h3>
          <p className="text-sm text-muted-foreground">{property.location}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {booking.checkIn && booking.checkOut
                ? `${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}`
                : "No dates selected"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">{booking.guests} guests</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => {
              const Icon = amenityIcons[amenity] || Mountain
              return (
                <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                  <Icon className="h-3 w-3" />
                  {amenity}
                </Badge>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

