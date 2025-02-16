import * as React from "react"

export default function DashboardPage() {
  return (
    <React.Suspense>
      <div className="container max-w-5xl mx-auto px-4 py-16">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
      </div>
    </React.Suspense>
  )
}
