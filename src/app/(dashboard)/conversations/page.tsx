"use client"

import React from "react"
import Masonry from "react-masonry-css"
import { ConversationCard } from "@/components/conversation-card"
import { SearchBar } from "@/components/search-bar"
import { Search } from "lucide-react"

interface RawConversation {
  id: number
  customerName: string
  latestMessage: string
  timestamp: string
}

interface ParsedConversation {
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
    timestamp: "2023-06-15T10:30:00Z"
  },
  {
    id: 2,
    customerName: "Bob Smith",
    latestMessage: "Is the property available next week?",
    timestamp: "2023-06-15T09:45:00Z"
  },
  {
    id: 3,
    customerName: "Carol White",
    latestMessage: "I've just made the payment.",
    timestamp: "2023-06-14T18:20:00Z"
  },
  {
    id: 4,
    customerName: "David Brown",
    latestMessage: "Can you provide more details about the amenities?",
    timestamp: "2023-06-14T15:10:00Z"
  },
  {
    id: 5,
    customerName: "Eva Green",
    latestMessage: "We're looking forward to our stay!",
    timestamp: "2023-06-13T11:05:00Z"
  },
  {
    id: 6,
    customerName: "Frank Miller",
    latestMessage: "Is early check-in possible?",
    timestamp: "2023-06-12T14:30:00Z"
  },
  {
    id: 7,
    customerName: "Grace Lee",
    latestMessage: "Do you have any discounts for longer stays?",
    timestamp: "2023-06-11T09:00:00Z"
  },
  {
    id: 8,
    customerName: "Henry Wilson",
    latestMessage:
      "What's the best way to reach the property from the airport?",
    timestamp: "2023-06-10T16:45:00Z"
  },
  {
    id: 9,
    customerName: "Ivy Taylor",
    latestMessage: "Can we bring our pet?",
    timestamp: "2023-06-09T13:20:00Z"
  },
  {
    id: 10,
    customerName: "Jack Robinson",
    latestMessage: "I need to change my reservation dates.",
    timestamp: "2023-06-08T10:15:00Z"
  },
  {
    id: 11,
    customerName: "Karen Davis",
    latestMessage: "Is there a grocery store nearby?",
    timestamp: "2023-06-07T11:30:00Z"
  },
  {
    id: 12,
    customerName: "Liam Anderson",
    latestMessage: "Can you recommend any local attractions?",
    timestamp: "2023-06-06T14:00:00Z"
  }
]

const MASONRY_BREAKPOINTS = {
  default: 6,
  1920: 6,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1
}

export default function ConversationsPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [parsedConversations, setParsedConversations] = React.useState<
    ParsedConversation[]
  >([])

  React.useLayoutEffect(() => {
    // Parse dates on the client side
    setParsedConversations(
      mockConversations.map((conv) => ({
        ...conv,
        timestamp: new Date(conv.timestamp)
      }))
    )
  }, [])

  const filteredConversations = parsedConversations.filter(
    (conversation) =>
      conversation.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      conversation.latestMessage
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Conversations</h1>
        <SearchBar
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={setSearchTerm}
          icon={<Search size={20} />}
        />
      </div>
      <Masonry
        breakpointCols={MASONRY_BREAKPOINTS}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredConversations.map((conversation) => (
          <ConversationCard key={conversation.id} {...conversation} />
        ))}
      </Masonry>
    </div>
  )
}
