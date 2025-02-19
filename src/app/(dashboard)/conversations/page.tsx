import React from "react"
import { ConversationsPage } from "@/components/conversations-page"

interface RawConversation {
  id: number
  customerName: string
  latestMessage: string
  timestamp: Date
}

const mockConversations: RawConversation[] = [
  {
    id: 1,
    customerName: "Alice Johnson",
    latestMessage: "Thanks for the quick response!",
    timestamp: new Date("2023-06-15T10:30:00Z")
  },
  {
    id: 2,
    customerName: "Bob Smith",
    latestMessage: "Is the property available next week?",
    timestamp: new Date("2023-06-15T09:45:00Z")
  },
  {
    id: 3,
    customerName: "Carol White",
    latestMessage: "I've just made the payment.",
    timestamp: new Date("2023-06-14T18:20:00Z")
  },
  {
    id: 4,
    customerName: "David Brown",
    latestMessage: "Can you provide more details about the amenities?",
    timestamp: new Date("2023-06-14T15:10:00Z")
  },
  {
    id: 5,
    customerName: "Eva Green",
    latestMessage: "We're looking forward to our stay!",
    timestamp: new Date("2023-06-13T11:05:00Z")
  },
  {
    id: 6,
    customerName: "Frank Miller",
    latestMessage: "Is early check-in possible?",
    timestamp: new Date("2023-06-12T14:30:00Z")
  },
  {
    id: 7,
    customerName: "Grace Lee",
    latestMessage: "Do you have any discounts for longer stays?",
    timestamp: new Date("2023-06-11T09:00:00Z")
  },
  {
    id: 8,
    customerName: "Henry Wilson",
    latestMessage:
      "What's the best way to reach the property from the airport?",
    timestamp: new Date("2023-06-10T16:45:00Z")
  },
  {
    id: 9,
    customerName: "Ivy Taylor",
    latestMessage: "Can we bring our pet?",
    timestamp: new Date("2023-06-09T13:20:00Z")
  },
  {
    id: 10,
    customerName: "Jack Robinson",
    latestMessage: "I need to change my reservation dates.",
    timestamp: new Date("2023-06-08T10:15:00Z")
  },
  {
    id: 11,
    customerName: "Karen Davis",
    latestMessage: "Is there a grocery store nearby?",
    timestamp: new Date("2023-06-07T11:30:00Z")
  },
  {
    id: 12,
    customerName: "Liam Anderson",
    latestMessage: "Can you recommend any local attractions?",
    timestamp: new Date("2023-06-06T14:00:00Z")
  }
]

async function getConversations() {
  return mockConversations
}

export default function Page() {
  const conversations = getConversations()

  return (
    <React.Suspense>
      <ConversationsPage conversations={conversations} />
    </React.Suspense>
  )
}
