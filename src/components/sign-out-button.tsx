"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

type SignOutButtonProps = React.ComponentPropsWithoutRef<typeof Button>

export function SignOutButton({ className, ...props }: SignOutButtonProps) {
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
    <Button
      onClick={handleSignOut}
      variant="ghost"
      size="sm"
      className={cn("gap-2", className)}
      {...props}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  )
}
