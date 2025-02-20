import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { OccupancyChart } from "@/components/occupancy-chart"
import type { ListingData } from "@/server/types"
import { formatPrice } from "@/server/format"

interface ListingCardProps {
  id: string
  data: ListingData
  defaultDailyPrice: number
  defaultWeeklyPrice: number
  defaultMonthlyPrice: number
}

export function ListingCard({
  id,
  data,
  defaultDailyPrice,
  defaultWeeklyPrice,
  defaultMonthlyPrice
}: ListingCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <Card className="transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg">
        <div className="flex h-[240px]">
          <div className="relative w-[320px] min-w-[320px]">
            <Image
              src={data.overview.imageUrl || "/placeholder.svg"}
              alt={data.overview.title}
              fill
              className="object-cover rounded-l-lg"
            />
            {data.overview.isSuperhost && (
              <Badge className="absolute right-3 top-3 z-10 bg-green-500 text-[11px] font-medium py-0.5">
                Superhost
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between h-full">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{data.overview.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {data.overview.location}
                </p>
                {data.overview.rating && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">
                      {data.overview.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({data.overview.reviewCount} reviews)
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-6 text-sm text-muted-foreground mt-2">
                  <span>Capacity: {data.overview.capacity} guests</span>
                  <span>Type: {data.overview.propertyType}</span>
                </div>
                <div className="mt-auto">
                  <OccupancyChart />
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="space-y-1">
                  <p className="text-lg font-semibold">
                    ${formatPrice(defaultDailyPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground">per night</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">
                    ${formatPrice(defaultWeeklyPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground">per week</p>
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">
                    ${formatPrice(defaultMonthlyPrice)}
                  </p>
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
