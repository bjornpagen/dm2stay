import type { Amenities } from "@/types/listing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function ListingAmenities({ amenities }: { amenities?: Amenities }) {
  if (!amenities || !amenities.groups || amenities.groups.length === 0) {
    return null // Or return a placeholder component
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{amenities.title || "Amenities"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {amenities.groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-semibold mb-2">{group.title}</h3>
              <ul className="space-y-1">
                {group.amenities.map((amenity, amenityIndex) => (
                  <li key={amenityIndex} className="flex items-center">
                    {amenity.available ? (
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                    ) : (
                      <X className="w-4 h-4 text-red-500 mr-2" />
                    )}
                    <span>{amenity.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

