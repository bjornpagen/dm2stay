"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

interface RevenueData {
  month: string
  revenue: number
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
}

export function RevenueChart({ data }: { data: RevenueData[] }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
      <ChartContainer config={chartConfig}>
        <BarChart data={data}>
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
  )
} 