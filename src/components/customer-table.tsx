"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { CustomerListItem } from "@/types/customer"

interface CustomerTableProps {
  customers: CustomerListItem[]
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const totalPages = Math.ceil(customers.length / itemsPerPage)

  const paginatedCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Bookings</TableHead>
            <TableHead>Total Spent</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCustomers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                <Link
                  href={`/customers/${customer.id}`}
                  className="hover:underline"
                >
                  {customer.name}
                </Link>
              </TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalBookings}</TableCell>
              <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
              <TableCell>{customer.lastActive.toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    customer.status === "active" ? "default" : "secondary"
                  }
                >
                  {customer.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
