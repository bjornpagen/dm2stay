import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface Alert {
  property: string
  issue: string
  priority: "High" | "Medium" | "Low"
}

export function MaintenanceAlerts({ alerts }: { alerts: Alert[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Maintenance Alerts</h3>
        <AlertTriangle className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
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
  )
} 