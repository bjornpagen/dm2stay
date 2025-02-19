"use client"

import * as React from "react"
import { useState, type KeyboardEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Mail, Send, MessageSquare, Instagram } from "lucide-react"

import type { Message } from "@/app/(dashboard)/customers/[id]/page"

const TikTokIcon = ({ color = "#000000" }) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="100%"
      height="100%"
    >
      <title>TikTok</title>
      <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
    </svg>
  )
}

export function MessageTimeline(params: { messages: Promise<Message[]> }) {
  const initialMessages = React.use(params.messages)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [sendMethod, setSendMethod] = useState<
    "email" | "sms" | "instagram_dm" | "tiktok_dm"
  >("email")

  const dummyData = {
    sender: {
      type: "host" as const,
      name: "You",
      avatar: "/host-avatar.jpg"
    }
  }

  const handleSend = () => {
    if (!newMessage.trim()) {
      return
    }

    const newMessageObj = {
      id: String(Date.now()),
      content: newMessage,
      source: sendMethod,
      createdAt: new Date()
    }

    setMessages([...messages, newMessageObj])
    setNewMessage("")
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const getMessageStyles = (source: Message["source"]) => {
    const baseStyles = "max-w-[80%] rounded-lg px-4 py-2 shadow-sm"
    switch (source) {
      case "user":
        return `${baseStyles} bg-primary text-primary-foreground self-end`
      case "ai":
        return `${baseStyles} bg-secondary self-end`
      default:
        return `${baseStyles} bg-background border border-border self-start`
    }
  }

  const sendMethodIcons = {
    email: <Mail className="h-4 w-4" />,
    sms: <MessageSquare className="h-4 w-4" />,
    instagram_dm: <Instagram className="h-4 w-4" />,
    tiktok_dm: (
      <div className="h-4 w-4">
        <TikTokIcon color="currentColor" />
      </div>
    )
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Conversation History</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col">
        <div className="relative flex-grow overflow-y-auto mb-2 space-y-4 sm:space-y-6 px-1 h-[calc(100%-140px)]">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={`flex items-center gap-2 ${message.source === "user" ? "justify-end" : ""}`}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={dummyData.sender.avatar} />
                  <AvatarFallback>
                    {dummyData.sender.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {dummyData.sender.name}
                </span>
              </div>
              <div className="flex flex-col">
                <div className={getMessageStyles(message.source)}>
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 mt-1 ${message.source === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span className="text-xs text-muted-foreground">
                    {message.createdAt.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                    {message.source}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-grow">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none"
            />
          </div>
          <div className="flex flex-col h-[80px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-b-none h-10 w-10"
                >
                  {sendMethodIcons[sendMethod]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSendMethod("email")}>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSendMethod("sms")}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>SMS</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSendMethod("instagram_dm")}>
                  <Instagram className="mr-2 h-4 w-4" />
                  <span>Instagram</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSendMethod("tiktok_dm")}>
                  <div className="mr-2 h-4 w-4">
                    <TikTokIcon color="currentColor" />
                  </div>
                  <span>TikTok</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-t-none h-[70px] w-10"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
