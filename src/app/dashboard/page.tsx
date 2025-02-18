"use client"

import { Card } from "@/components/ui/card"
import { 
  Building2, 
  DollarSign, 
  Percent,
  Star,
  AlertTriangle,
  ArrowUpRight
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"

const revenueData = [
  { month: "Jan", revenue: 35000 },
  { month: "Feb", revenue: 42000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 45000 },
  { month: "May", revenue: 43000 },
  { month: "Jun", revenue: 48560 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

const upcomingCheckins = [
  {
    guest: "Sarah Wilson",
    property: "Sunset Villa",
    checkIn: "Tomorrow",
    nights: 4,
    status: "Confirmed"
  },
  {
    guest: "Michael Brown",
    property: "Mountain Lodge",
    checkIn: "In 2 days",
    nights: 7,
    status: "Pending"
  },
  {
    guest: "Emma Davis",
    property: "City Loft",
    checkIn: "In 3 days",
    nights: 3,
    status: "Confirmed"
  }
]

const maintenanceAlerts = [
  {
    property: "Sunset Villa",
    issue: "AC maintenance due",
    priority: "Medium"
  },
  {
    property: "Mountain Lodge",
    issue: "Water heater inspection needed",
    priority: "High"
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
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Total Listings</h3>
            <Building2 className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-baseline gap-1 text-sm">
              <span className="text-primary">+2.5%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Average Occupancy</h3>
            <Percent className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">78%</div>
            <div className="flex items-baseline gap-1 text-sm">
              <span className="text-primary">+5.3%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Average Rating</h3>
            <Star className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="flex items-baseline gap-1 text-sm">
              <span className="text-primary">+0.2</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Monthly Revenue</h3>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">$48,560</div>
            <div className="flex items-baseline gap-1 text-sm">
              <span className="text-primary">+8.4%</span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={revenueData}>
              <CartesianGrid vertical={false} className="stroke-border" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                className="text-sm text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-sm text-muted-foreground"
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload?.[0]?.value) {
                    return (
                      <div className="rounded-lg border bg-card p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Revenue
                            </span>
                            <span className="font-bold text-card-foreground">
                              ${payload[0].value.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar
                dataKey="revenue"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Check-ins</h3>
          <div className="space-y-4">
            {upcomingCheckins.map((checkin) => (
              <div key={checkin.guest} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{checkin.guest}</p>
                  <p className="text-sm text-muted-foreground">
                    {checkin.property} • {checkin.nights} nights
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {checkin.checkIn}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  checkin.status === "Confirmed" 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {checkin.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Top Performing Listings</h3>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {topProperties.map((property) => (
              <div key={property.name} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{property.name}</p>
                  <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                    <span>${property.revenue.toLocaleString()}</span>
                    <span>{property.occupancy}% occupied</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-primary fill-primary" />
                      {property.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Maintenance Alerts</h3>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {maintenanceAlerts.map((alert) => (
              <div key={alert.issue} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{alert.property}</p>
                  <p className="text-sm text-muted-foreground">{alert.issue}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.priority === "High" 
                    ? "bg-destructive/20 text-destructive" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {alert.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
