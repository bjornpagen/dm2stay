"use client"

import React from "react"
import Masonry from "react-masonry-css"
import { Search } from "lucide-react"

import { ConversationCard } from "@/components/conversation-card"
import { SearchBar } from "@/components/search-bar"

import type { Conversation } from "@/app/(dashboard)/conversations/page"

const MASONRY_BREAKPOINTS = {
  default: 6,
  1920: 6,
  1536: 5,
  1280: 4,
  1024: 3,
  768: 2,
  640: 1
}

export function Conversations(props: {
  conversations: Promise<Conversation[]>
}) {
  const conversations = React.use(props.conversations)
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredConversations = conversations.filter(
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
