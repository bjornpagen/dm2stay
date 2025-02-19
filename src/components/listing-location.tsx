import type { Location } from "@/types/listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function ListingLocation({ location }: { location: Location }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{location.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start">
          <MapPin className="w-5 h-5 mt-1 mr-2" />
          <div>
            <p className="font-medium">{location.subtitle}</p>
            <p className="text-muted-foreground">{location.address}</p>
          </div>
        </div>
        {location.locationDetails.full.map((detail) => (
          <div key={detail.id} className="mt-4">
            <h3 className="font-semibold">{detail.title}</h3>
            <p>{detail.content}</p>
          </div>
        ))}
        {location.disclaimer && <p className="mt-4 text-sm text-muted-foreground">{location.disclaimer}</p>}
      </CardContent>
    </Card>
  )
}

