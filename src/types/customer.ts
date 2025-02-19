export interface CustomerListItem {
  id: number
  name: string
  email: string
  totalBookings: number
  totalSpent: number
  lastActive: Date
  status: "active" | "inactive"
}

export interface CustomerProfile {
  id: number
  name: string
  avatar?: string
  email: string
  phone?: string
  joinDate: Date
  location?: string
  totalBookings: number
  totalSpent: number
  preferredLanguage?: string
  lastActive: Date
  verificationStatus: {
    email: boolean
    phone: boolean
    government_id: boolean
  }
}

export interface Message {
  id: number
  content: string
  timestamp: Date
  sender: {
    type: "guest" | "host" | "ai"
    name: string
    avatar?: string
  }
  source: "email" | "sms" | "instagram" | "tiktok"
}

export interface Booking {
  id: number
  checkIn: Date
  checkOut: Date
  propertyName: string
  status: "upcoming" | "completed" | "pending" | "cancelled"
  paymentStatus: "paid" | "partially_paid" | "pending" | "refunded"
  totalAmount: number
  guestCount: number
}
