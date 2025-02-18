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

const reservations = [
  {
    id: "1",
    property: "Sunset Villa",
    guest: "John Smith",
    checkIn: "2024-03-15",
    checkOut: "2024-03-20",
    status: "Confirmed",
  },
  {
    id: "2",
    property: "Mountain Lodge",
    guest: "Jane Doe",
    checkIn: "2024-03-18",
    checkOut: "2024-03-25",
    status: "Pending",
  },
  {
    id: "3",
    property: "City Loft",
    guest: "Mike Johnson",
    checkIn: "2024-03-22",
    checkOut: "2024-03-24",
    status: "Confirmed",
  },
]

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage your property reservations
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Reservation
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Guest</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">
                  {reservation.property}
                </TableCell>
                <TableCell>{reservation.guest}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>{reservation.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 