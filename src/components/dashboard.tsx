"use client"

import * as React from "react"
import Link from "next/link"
import type { ListingData } from "@/server/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type DashboardProps = {
  listings: Array<{
    id: string
    airbnbId: string | null
    airbnbData: ListingData | null
    airbnbUrl: string | null
  }>
  importProperty: (url: string) => Promise<void>
}

export function Dashboard({ listings, importProperty }: DashboardProps) {
  const [url, setUrl] = React.useState("")
  const [isImporting, setIsImporting] = React.useState(false)

  async function onSubmit(formData: FormData) {
    setIsImporting(true)
    try {
      await importProperty(formData.get("url") as string)
    } catch (error) {
      console.error("Error importing property:", error)
    } finally {
      setIsImporting(false)
      setUrl("")
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Import New Property</h2>
        <form action={onSubmit} className="flex gap-2">
          <Input
            type="url"
            name="url"
            placeholder="Paste Airbnb listing URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isImporting}>
            {isImporting ? "Importing..." : "Import"}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Properties</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              href={`/property/${listing.id}`}
              className="rounded-lg border p-4 hover:bg-accent/50"
            >
              <div className="space-y-2">
                {listing.airbnbData ? (
                  <React.Fragment>
                    <div className="font-medium">
                      {listing.airbnbData.h1Title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {listing.airbnbUrl}
                    </div>
                    <div className="text-sm">
                      <div>{listing.airbnbData.location.address}</div>
                      <div>
                        {listing.airbnbData.overview.propertyType} ·{" "}
                        {listing.airbnbData.overview.capacity} guests
                      </div>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="font-medium">Property Details Loading</div>
                    <div className="text-sm text-muted-foreground">
                      {listing.airbnbId ? (
                        <React.Fragment>
                          <div>Fetching data from Airbnb...</div>
                          <div>Check back in a few minutes</div>
                        </React.Fragment>
                      ) : (
                        "No Airbnb listing connected"
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
