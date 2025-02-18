"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface RevenueData {
  month: string
  revenue: number
  fill: string
}

type TimePeriod = "1y" | "6m" | "3m" | "1m"

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  jan: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  feb: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  mar: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  apr: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },
  jun: {
    label: "June",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RevenueChart({ 
  data,
  className
}: { 
  data: RevenueData[]
  className?: string 
}) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("1y")

  const filterData = (period: TimePeriod) => {
    let monthsToShow: number
    switch (period) {
      case "1y":
        monthsToShow = 12
        break
      case "6m":
        monthsToShow = 6
        break
      case "3m":
        monthsToShow = 3
        break
      case "1m":
        monthsToShow = 1
        break
      default:
        monthsToShow = 12
    }
    return data.slice(-monthsToShow)
  }

  const filteredData = filterData(timePeriod)

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timePeriod === "1m" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("1m")}
            >
              1 Month
            </Button>
            <Button
              variant={timePeriod === "3m" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("3m")}
            >
              3 Months
            </Button>
            <Button
              variant={timePeriod === "6m" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("6m")}
            >
              6 Months
            </Button>
            <Button
              variant={timePeriod === "1y" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimePeriod("1y")}
            >
              1 Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
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
              strokeWidth={2}
              radius={8}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 8.4% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing monthly revenue for property rentals
        </div>
      </CardFooter>
    </Card>
  )
} 