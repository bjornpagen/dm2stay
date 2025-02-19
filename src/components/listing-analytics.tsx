"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const mockAnalyticsData = [
  { month: "Jan", inquiries: 10, bookings: 5 },
  { month: "Feb", inquiries: 15, bookings: 8 },
  { month: "Mar", inquiries: 20, bookings: 12 },
  { month: "Apr", inquiries: 25, bookings: 15 },
  { month: "May", inquiries: 30, bookings: 18 },
  { month: "Jun", inquiries: 35, bookings: 22 }
]

export function ListingAnalytics({ listingId }: { listingId: string }) {
  console.log(listingId)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </p>
            <p className="text-2xl font-bold">62.8%</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Average Stay
            </p>
            <p className="text-2xl font-bold">4.2 nights</p>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="inquiries"
                stroke="#8884d8"
                name="Inquiries"
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#82ca9d"
                name="Bookings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
