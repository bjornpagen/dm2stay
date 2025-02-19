"use client"

import * as React from "react"
import type { Listing } from "@/app/(dashboard)/listings/page"
import { ListingCard } from "@/components/listing-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { ImportListingsModal } from "@/components/import-listings-modal"

export function ListingsPage(params: { listings: Promise<Listing[]> }) {
  const listings = React.use(params.listings)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-8">
        <h1 className="text-2xl font-bold">Listings</h1>
        <div className="flex items-center gap-3 flex-1 justify-end max-w-3xl">
          <SearchBar
            placeholder="Search listings..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={<Search size={20} />}
          />
          <Button
            onClick={() => setIsImportModalOpen(true)}
            className="bg-[#14161A] hover:bg-[#14161A]/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Import Listings
          </Button>
        </div>
      </div>
      <div className="divide-y divide-border -mx-6 px-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {listings
          .filter((listing) => {
            if (!listing.data) {
              return false
            }
            return listing.data.overview.title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          })
          .map((listing) => {
            if (!listing.data) {
              return null
            }
            return (
              <div key={listing.id} className="py-6 first:pt-0 last:pb-0">
                <ListingCard
                  id={listing.id}
                  data={listing.data}
                  defaultDailyPrice={listing.defaultDailyPrice}
                  defaultWeeklyPrice={listing.defaultWeeklyPrice}
                  defaultMonthlyPrice={listing.defaultMonthlyPrice}
                />
              </div>
            )
          })}
      </div>
      <ImportListingsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  )
}
