import { Building2, DollarSign, Percent, Star } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { UpcomingCheckins } from "@/components/dashboard/upcoming-checkins"
import { TopProperties } from "@/components/dashboard/top-properties"
import { MaintenanceAlerts } from "@/components/dashboard/maintenance-alerts"

const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 43000 },
  { month: "Jun", revenue: 48560 },
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
    icon: Building2
  },
  {
    title: "Average Occupancy",
    value: "78%",
    change: { value: "+5.3%", trend: "up" as const },
    icon: Percent
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: { value: "+0.2", trend: "up" as const },
    icon: Star
  },
  {
    title: "Monthly Revenue",
    value: "$48,560",
    change: { value: "+8.4%", trend: "up" as const },
    icon: DollarSign
  }
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated:</span>
          <span className="font-medium">Today, 9:34 AM</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <RevenueChart data={revenueData} />
        <UpcomingCheckins checkins={upcomingCheckins} />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <TopProperties properties={topProperties} />
        <MaintenanceAlerts alerts={maintenanceAlerts} />
      </div>
    </div>
  )
}
