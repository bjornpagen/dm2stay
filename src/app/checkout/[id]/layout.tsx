import * as React from "react"

export default function DashboardLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <div className="flex-1">
        <div className="container mx-auto px-6 max-w-7xl">{children}</div>
      </div>
    </React.Fragment>
  )
}
