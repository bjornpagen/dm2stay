import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from "lucide-react"

const listings = [
  {
    id: "1",
    name: "Sunset Villa",
    location: "Miami, FL",
    type: "Villa",
    status: "Available",
  },
  {
    id: "2",
    name: "Mountain Lodge",
    location: "Aspen, CO",
    type: "Cabin",
    status: "Occupied",
  },
  {
    id: "3",
    name: "City Loft",
    location: "New York, NY",
    type: "Apartment",
    status: "Available",
  },
]

export default function ListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Listings</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Listing
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.name}</TableCell>
                <TableCell>{listing.location}</TableCell>
                <TableCell>{listing.type}</TableCell>
                <TableCell>{listing.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 