import type { Message, Booking, CustomerProfile } from "@/types/customer"

export const mockCustomerProfile: CustomerProfile = {
  id: 1,
  name: "Alice Johnson",
  avatar:
    "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg",
  email: "alice.j@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: new Date("2023-01-15"),
  location: "San Francisco, CA",
  totalBookings: 5,
  totalSpent: 2750,
  preferredLanguage: "English",
  lastActive: new Date("2024-02-15"),
  verificationStatus: {
    email: true,
    phone: true,
    government_id: true
  }
}

export const mockMessages: Message[] = [
  {
    id: 1,
    content:
      "Hi! I'm interested in booking the Mountain Retreat Cabin for next month. Is it available for a week-long stay?",
    timestamp: new Date("2024-02-15T10:30:00"),
    sender: {
      type: "guest",
      name: "Alice Johnson",
      avatar:
        "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg"
    },
    source: "email"
  },
  {
    id: 2,
    content:
      "Hello Alice! Thank you for your interest. I'll check the availability right away.",
    timestamp: new Date("2024-02-15T10:32:00"),
    sender: {
      type: "ai",
      name: "AI Assistant"
    },
    source: "email"
  },
  {
    id: 3,
    content:
      "Hi Alice! Yes, the cabin is available. I can offer you a 10% discount for a week-long stay. Would you like to proceed with the booking?",
    timestamp: new Date("2024-02-15T10:35:00"),
    sender: {
      type: "host",
      name: "John Host",
      avatar: "/host-avatar.jpg"
    },
    source: "email"
  },
  {
    id: 4,
    content:
      "That sounds great! Yes, I'd love to proceed with the booking. Can you share more details about the check-in process?",
    timestamp: new Date("2024-02-15T10:40:00"),
    sender: {
      type: "guest",
      name: "Alice Johnson",
      avatar:
        "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg"
    },
    source: "sms"
  },
  {
    id: 5,
    content:
      "Of course! I've sent you an email with all the check-in details. Let me know if you need any clarification.",
    timestamp: new Date("2024-02-15T11:00:00"),
    sender: {
      type: "host",
      name: "John Host",
      avatar: "/host-avatar.jpg"
    },
    source: "sms"
  },
  {
    id: 6,
    content:
      "Just wanted to let you know that I've received your email. Everything looks good! Can't wait for the trip!",
    timestamp: new Date("2024-02-15T14:20:00"),
    sender: {
      type: "guest",
      name: "Alice Johnson",
      avatar:
        "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg"
    },
    source: "instagram"
  },
  {
    id: 7,
    content:
      "Great to hear that, Alice! We're looking forward to hosting you. Feel free to reach out if you need any recommendations for activities in the area.",
    timestamp: new Date("2024-02-15T14:30:00"),
    sender: {
      type: "host",
      name: "John Host",
      avatar: "/host-avatar.jpg"
    },
    source: "instagram"
  },
  {
    id: 8,
    content:
      "Hey! I just posted a TikTok about packing for a cabin trip. Any must-bring items you'd recommend for the Mountain Retreat?",
    timestamp: new Date("2024-02-16T09:15:00"),
    sender: {
      type: "guest",
      name: "Alice Johnson",
      avatar:
        "https://a0.muscache.com/im/users/7919941/profile_pic/1376202256/original.jpg"
    },
    source: "tiktok"
  },
  {
    id: 9,
    content:
      "That's awesome, Alice! For the Mountain Retreat, I'd recommend bringing hiking boots, a reusable water bottle, and a good camera to capture the views. Can't wait to see your TikTok!",
    timestamp: new Date("2024-02-16T09:30:00"),
    sender: {
      type: "host",
      name: "John Host",
      avatar: "/host-avatar.jpg"
    },
    source: "tiktok"
  }
]

export const mockBookings: Booking[] = [
  {
    id: 1,
    checkIn: new Date("2024-03-15"),
    checkOut: new Date("2024-03-22"),
    propertyName: "Mountain Retreat Cabin",
    status: "upcoming",
    paymentStatus: "paid",
    totalAmount: 1200,
    guestCount: 2
  },
  {
    id: 2,
    checkIn: new Date("2023-12-24"),
    checkOut: new Date("2023-12-26"),
    propertyName: "Luxury Villa in South Tyrol",
    status: "completed",
    paymentStatus: "paid",
    totalAmount: 850,
    guestCount: 4
  },
  {
    id: 3,
    checkIn: new Date("2023-08-10"),
    checkOut: new Date("2023-08-15"),
    propertyName: "Beachfront Paradise",
    status: "completed",
    paymentStatus: "paid",
    totalAmount: 700,
    guestCount: 2
  }
]
