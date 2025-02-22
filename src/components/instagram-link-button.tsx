"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Instagram } from "lucide-react"
import { authClient } from "@/lib/auth"

export function InstagramLinkButton() {
  const [isLinking, setIsLinking] = React.useState(false)
  const [isLinked, setIsLinked] = React.useState(false)

  const handleInstagramLink = async () => {
    try {
      setIsLinking(true)
      const response = await authClient.oauth2.link({
        providerId: "instagram",
        callbackURL: "/conversations"
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      setIsLinked(true)
    } catch (error) {
      console.error("Failed to link Instagram:", error)
    } finally {
      setIsLinking(false)
    }
  }

  if (isLinked) {
    return (
      <Button variant="ghost" size="sm" className="text-green-600" disabled>
        <Instagram className="w-5 h-5 mr-2" />
        <span>Instagram Connected</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleInstagramLink}
      disabled={isLinking}
    >
      <Instagram className="w-5 h-5 mr-2" />
      <span>{isLinking ? "Connecting..." : "Connect Instagram"}</span>
    </Button>
  )
}
