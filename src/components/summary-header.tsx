import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Clock, Home, DollarSign } from "lucide-react"

const stats = [
  { label: "Active Conversations", value: 24, icon: MessageSquare },
  { label: "Pending Responses", value: 5, icon: Clock },
  { label: "Today's Bookings", value: 3, icon: Home },
  { label: "Recent Revenue", value: "$1,250", icon: DollarSign },
]

export function SummaryHeader() {
  return (
    <div className="w-full h-20 bg-white shadow-sm rounded-lg mb-6">
      <div className="h-full flex items-center justify-between px-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-none">
            <CardContent className="flex items-center p-3">
              <stat.icon size={20} className="text-primary mr-3" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

