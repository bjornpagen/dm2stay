"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/client/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = React.useCallback(async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin")
        }
      }
    })
  }, [router])

  return (
    <Button onClick={handleSignOut} variant="ghost" size="sm">
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  )
}
