import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const spendingData = [
  { month: "Jan", amount: 400 },
  { month: "Feb", amount: 300 },
  { month: "Mar", amount: 200 },
  { month: "Apr", amount: 278 },
  { month: "May", amount: 189 },
  { month: "Jun", amount: 239 },
]

const bookingData = [
  { id: 1, start: "2023-07-01", end: "2023-07-07", property: "Beach House" },
  { id: 2, start: "2023-08-15", end: "2023-08-22", property: "Mountain Cabin" },
  { id: 3, start: "2023-12-24", end: "2023-12-31", property: "Ski Chalet" },
]

export function CustomerAnalytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Spending Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Booking Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookingData.map((booking) => (
              <div key={booking.id} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-16 text-sm text-muted-foreground">{booking.start}</div>
                <div className="flex-grow h-2 bg-primary rounded-full" />
                <div className="flex-shrink-0 w-16 text-sm text-muted-foreground">{booking.end}</div>
                <div className="flex-shrink-0 w-32 text-sm font-medium">{booking.property}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

