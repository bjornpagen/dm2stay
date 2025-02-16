import * as React from "react"
import { HomeContent } from "@/components/home"

export default function HomePage() {
  return (
    <React.Suspense>
      <HomeContent />
    </React.Suspense>
  )
}
