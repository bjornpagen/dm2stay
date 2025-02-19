"use client"

import { useState } from "react"
import { ListingCard } from "@/components/listing-card"
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"
import { ImportListingsModal } from "@/components/import-listings-modal"

const mockListings = [
  {
    id: 1,
    name: "Luxury Villa in South Tyrol",
    image:
      "https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTc4ODk3MzIwMTc5MTQ2NDM3/original/711b3443-e480-4e29-9085-86062c04073a.jpeg",
    location: "Bolzano, Trentino-Alto Adige/South Tyrol, Italy",
    price: {
      perNight: 250,
      perWeek: 1500,
      perMonth: 5000
    },
    rating: 4.8,
    reviewCount: 55,
    inquiries: 15,
    activeBookings: 3,
    conversionRate: 0.2,
    occupancyData: [65, 70, 68, 72, 75, 80, 82, 85, 80, 78].map((value) => ({
      value
    }))
  },
  {
    id: 2,
    name: "Mountain Retreat Cabin",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/eaf77ed0-35a8-4ec9-b343-b42fadd410a0.jpeg",
    location: "Aspen, Colorado, United States",
    price: {
      perNight: 180,
      perWeek: 1100,
      perMonth: 3800
    },
    rating: 4.8,
    reviewCount: 42,
    inquiries: 10,
    activeBookings: 2,
    conversionRate: 0.15,
    occupancyData: [60, 62, 65, 68, 70, 72, 75, 73, 70, 72].map((value) => ({
      value
    }))
  },
  {
    id: 3,
    name: "Beachfront Paradise",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/7bf163ab-7190-474e-bd2e-620053a0d83f.jpeg",
    location: "Maui, Hawaii, United States",
    price: {
      perNight: 300,
      perWeek: 1800,
      perMonth: 6000
    },
    rating: 4.9,
    reviewCount: 68,
    inquiries: 20,
    activeBookings: 5,
    conversionRate: 0.25,
    occupancyData: [75, 78, 80, 82, 85, 88, 90, 92, 90, 88].map((value) => ({
      value
    }))
  },
  {
    id: 4,
    name: "Cozy City Apartment",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/4bb91c06-f10e-41c0-939d-7c1acd48a2bd.jpeg",
    location: "New York City, New York, United States",
    price: {
      perNight: 150,
      perWeek: 900,
      perMonth: 3000
    },
    rating: 4.6,
    reviewCount: 89,
    inquiries: 18,
    activeBookings: 4,
    conversionRate: 0.22,
    occupancyData: [70, 72, 75, 78, 80, 82, 85, 83, 80, 82].map((value) => ({
      value
    }))
  },
  {
    id: 5,
    name: "Rustic Countryside Cottage",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/259cac77-3c70-4f5a-a873-bbf0c9586190.jpeg",
    location: "Cotswolds, England, United Kingdom",
    price: {
      perNight: 120,
      perWeek: 700,
      perMonth: 2400
    },
    rating: 4.8,
    reviewCount: 36,
    inquiries: 8,
    activeBookings: 2,
    conversionRate: 0.18,
    occupancyData: [55, 58, 60, 62, 65, 68, 70, 72, 70, 68].map((value) => ({
      value
    }))
  },
  {
    id: 6,
    name: "Modern Loft in Historic Center",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-578897320179146437/original/c3822bda-2cec-4bd3-a2d3-eb938463d115.jpeg",
    location: "Prague, Czech Republic",
    price: {
      perNight: 100,
      perWeek: 600,
      perMonth: 2000
    },
    rating: 4.7,
    reviewCount: 52,
    inquiries: 12,
    activeBookings: 3,
    conversionRate: 0.2,
    occupancyData: [65, 68, 70, 72, 75, 78, 80, 82, 80, 78].map((value) => ({
      value
    }))
  }
]

export default function ListingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)

  const filteredListings = mockListings.filter((listing) =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        {filteredListings.map((listing) => (
          <div key={listing.id} className="py-6 first:pt-0 last:pb-0">
            <ListingCard {...listing} />
          </div>
        ))}
      </div>
      <ImportListingsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />
    </div>
  )
}
