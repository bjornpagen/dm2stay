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
}

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-5 w-5 text-muted-foreground" />
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