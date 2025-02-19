import * as React from "react"
import { Header } from "@/components/header"

export default function DashboardLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <div className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-7xl">{children}</div>
      </div>
    </React.Fragment>
  )
}
