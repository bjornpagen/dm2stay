"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { importAirbnbListing } from "@/server/import"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface ImportListingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportListingsModal({
  isOpen,
  onClose
}: ImportListingsModalProps) {
  const [airbnbUrl, setAirbnbUrl] = React.useState("")
  const [urlError, setUrlError] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)

  const validateAirbnbUrl = (url: string) => {
    if (!url) {
      return "URL is required"
    }

    try {
      const parsedUrl = new URL(url)
      const isAirbnbDomain = parsedUrl.hostname.includes("airbnb")
      const hasRoomPath = parsedUrl.pathname.includes("/rooms/")

      if (!isAirbnbDomain) {
        return "Must be an Airbnb URL"
      }
      if (!hasRoomPath) {
        return "Must be a valid Airbnb listing URL"
      }

      return ""
    } catch {
      return "Invalid URL format"
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setAirbnbUrl(newUrl)
    setUrlError(validateAirbnbUrl(newUrl))
  }

  const handleImport = async () => {
    if (!airbnbUrl) {
      return
    }

    const error = validateAirbnbUrl(airbnbUrl)
    if (error) {
      setUrlError(error)
      return
    }

    try {
      setIsLoading(true)
      await importAirbnbListing(airbnbUrl)
      toast.success("Successfully queued import")
      onClose()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Import failed"
      setUrlError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Airbnb Listing</DialogTitle>
          <DialogDescription>
            Enter your Airbnb listing URL to import the property details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="airbnb-url">Airbnb Listing URL</Label>
            <Input
              id="airbnb-url"
              placeholder="https://airbnb.com/rooms/..."
              value={airbnbUrl}
              onChange={handleUrlChange}
              className={urlError ? "border-red-500" : ""}
            />
            {urlError && <p className="text-sm text-red-500">{urlError}</p>}
          </div>
          <Button
            onClick={handleImport}
            className="w-full"
            disabled={!airbnbUrl || Boolean(urlError) || isLoading}
          >
            {isLoading ? (
              <React.Fragment>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </React.Fragment>
            ) : (
              "Import from Airbnb"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
