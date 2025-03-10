import { Card } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

interface CheckIn {
  guest: string
  property: string
  checkIn: string
  nights: number
  status: "Confirmed" | "Pending"
}

export function UpcomingCheckins({ checkins }: { checkins: CheckIn[] }) {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Check-ins</h3>
        <CalendarDays className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {checkins.map((checkin) => (
          <div
            key={checkin.guest}
            className="flex items-center justify-between border-b pb-4 last:border-0"
          >
            <div>
              <p className="font-medium">{checkin.guest}</p>
              <p className="text-sm text-muted-foreground">
                {checkin.property} • {checkin.nights} nights
              </p>
              <p className="text-sm font-medium mt-1">{checkin.checkIn}</p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                checkin.status === "Confirmed"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {checkin.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
