import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const notifications = [
  { id: 1, message: "Upcoming booking in 3 days", type: "info" },
  { id: 2, message: "Payment for last booking successful", type: "success" },
  { id: 3, message: "Customer left a new review", type: "warning" }
]

export function CustomerStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-4 w-4" />
          Status & Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Account Status</span>
            <Badge variant="outline" className="bg-green-100 text-green-800">
              Active
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Loyalty Level</span>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              Gold
            </Badge>
          </div>
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Recent Notifications</h4>
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-start space-x-2 text-sm"
                >
                  {notification.type === "info" && (
                    <Bell className="h-4 w-4 text-blue-500 mt-0.5" />
                  )}
                  {notification.type === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                  )}
                  {notification.type === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  )}
                  {notification.type === "error" && (
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  )}
                  <span>{notification.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
