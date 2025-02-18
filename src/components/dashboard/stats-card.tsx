import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  change: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon: LucideIcon
  historicalData?: number[] // Array of historical values for the sparkline
}

function Sparkline({ data, color, title }: { data: number[], color: string, title: string }) {
  const normalizedData = data.length > 0 ? data.map((value, i) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    return {
      x: (i / (data.length - 1)) * 100,
      y: 100 - ((value - min) / range) * 100
    }
  }) : []

  const points = normalizedData.map(point => `${point.x},${point.y}`).join(' ')

  return (
    <svg
      className="w-[64px] h-[24px]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-label={`${title} trend visualization`}
    >
      <title>{`${title} trend visualization`}</title>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function StatsCard({ title, value, change, icon: Icon, historicalData = [] }: StatsCardProps) {
  let trendColor = "var(--muted-foreground)"
  if (change.trend === "up") {
    trendColor = "var(--primary)"
  } else if (change.trend === "down") {
    trendColor = "var(--destructive)"
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {historicalData.length > 0 && (
          <Sparkline data={historicalData} color={trendColor} title={title} />
        )}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-baseline gap-1 text-sm">
          <span className="text-primary">{change.value}</span>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </div>
    </Card>
  )
} 