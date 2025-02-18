import { Building2, DollarSign, Percent, Star } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UpcomingCheckins } from "@/components/dashboard/upcoming-checkins"
import { TopProperties } from "@/components/dashboard/top-properties"
import { MaintenanceAlerts } from "@/components/dashboard/maintenance-alerts"
import { Card } from "@/components/ui/card"

const revenueData = [
  { month: "Jan", revenue: 35000, fill: "hsl(var(--chart-1))" },
  { month: "Feb", revenue: 42000, fill: "hsl(var(--chart-2))" },
  { month: "Mar", revenue: 38000, fill: "hsl(var(--chart-3))" },
  { month: "Apr", revenue: 45000, fill: "hsl(var(--chart-4))" },
  { month: "May", revenue: 43000, fill: "hsl(var(--chart-5))" },
  { month: "Jun", revenue: 48560, fill: "hsl(var(--chart-1))" },
]

const upcomingCheckins = [
  {
    guest: "Sarah Wilson",
    property: "Sunset Villa",
    checkIn: "Tomorrow",
    nights: 4,
    status: "Confirmed" as const
  },
  {
    guest: "Michael Brown",
    property: "Mountain Lodge",
    checkIn: "In 2 days",
    nights: 7,
    status: "Pending" as const
  },
  {
    guest: "Emma Davis",
    property: "City Loft",
    checkIn: "In 3 days",
    nights: 3,
    status: "Confirmed" as const
  }
]

const maintenanceAlerts = [
  {
    property: "Sunset Villa",
    issue: "AC maintenance due",
    priority: "Medium" as const
  },
  {
    property: "Mountain Lodge",
    issue: "Water heater inspection needed",
    priority: "High" as const
  }
]

const topProperties = [
  {
    name: "Sunset Villa",
    revenue: 22500,
    occupancy: 85,
    rating: 4.9
  },
  {
    name: "Mountain Lodge",
    revenue: 18760,
    occupancy: 78,
    rating: 4.8
  },
  {
    name: "City Loft",
    revenue: 15300,
    occupancy: 72,
    rating: 4.7
  }
]

const stats = [
  {
    title: "Total Listings",
    value: "12",
    change: { value: "+2.5%", trend: "up" as const },
    icon: Building2,
    historicalData: [8, 9, 9, 10, 11, 11, 12]
  },
  {
    title: "Average Occupancy",
    value: "78%",
    change: { value: "+5.3%", trend: "up" as const },
    icon: Percent,
    historicalData: [65, 68, 72, 70, 74, 76, 78]
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: { value: "+0.2", trend: "up" as const },
    icon: Star,
    historicalData: [4.4, 4.5, 4.5, 4.6, 4.7, 4.7, 4.8]
  },
  {
    title: "Monthly Revenue",
    value: "$48,560",
    change: { value: "+8.4%", trend: "up" as const },
    icon: DollarSign,
    historicalData: [38000, 40000, 42000, 43500, 45000, 47000, 48560]
  }
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-8 p-8 w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated:</span>
          <span className="font-medium">Today, 9:34 AM</span>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-5">
        <div className="col-span-3">
          <RevenueChart data={revenueData} />
        </div>
        <div className="col-span-2">
          <Card className="h-full p-4">
            <Calendar  />
          </Card>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-3">
        <TopProperties properties={topProperties} />
        <UpcomingCheckins checkins={upcomingCheckins} />
        <MaintenanceAlerts alerts={maintenanceAlerts} />
      </div>
    </div>
  )
}
