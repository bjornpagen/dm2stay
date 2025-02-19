import type { CustomerListItem } from "@/types/customer"

export const mockCustomerList: CustomerListItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  totalBookings: Math.floor(Math.random() * 10),
  totalSpent: Math.floor(Math.random() * 10000),
  lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  status: Math.random() > 0.2 ? "active" : "inactive",
}))

