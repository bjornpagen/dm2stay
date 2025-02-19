import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { LineChart, Line, ResponsiveContainer } from "recharts"

interface ListingCardProps {
  id: number
  name: string
  image: string
  location: string
  price: {
    perNight: number
    perWeek: number
    perMonth: number
  }
  rating: number
  reviewCount: number
  inquiries: number
  activeBookings: number
  conversionRate: number
  occupancyData: { value: number }[]
}

export function ListingCard({
  id,
  name,
  image,
  location,
  price,
  rating,
  reviewCount,
  inquiries,
  activeBookings,
  conversionRate,
  occupancyData
}: ListingCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <Card className="transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg">
        <div className="flex h-[240px]">
          <div className="relative w-[320px] min-w-[320px]">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover rounded-l-lg"
            />
            {inquiries > 0 && (
              <Badge className="absolute right-3 top-3 z-10 bg-green-500 text-[11px] font-medium py-0.5">
                New Inquiry
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between h-full">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-sm text-muted-foreground">{location}</p>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{rating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">
                    ({reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mt-2">
                  <span>Inquiries: {inquiries}</span>
                  <span>Active Bookings: {activeBookings}</span>
                </div>
                <div className="mt-auto">
                  <p className="text-sm font-medium mb-1">
                    Conversion Rate: {(conversionRate * 100).toFixed(1)}%
                  </p>
                  <div className="h-12 w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={occupancyData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#4CAF50"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground">
                      Occupancy Trend
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">${price.perNight}</p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">${price.perWeek}</p>
                  <p className="text-sm text-muted-foreground">per week</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">${price.perMonth}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
