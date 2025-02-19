"use client"

import * as React from "react"
import { useState, type KeyboardEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Mail, Send, MessageSquare, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"

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

  const handleSend = () => {
    if (!newMessage.trim()) {
      return
    }

    const newMessageObj: Message = {
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
    const baseStyles = "max-w-md rounded-lg px-4 py-2 shadow-sm"
    switch (source) {
      case "user":
        return cn(baseStyles, "bg-primary text-primary-foreground ml-auto")
      case "ai":
        return cn(baseStyles, "bg-secondary ml-auto")
      default:
        return cn(baseStyles, "bg-background border border-border")
    }
  }

  const getMessageAlignment = (source: Message["source"]) => {
    return source === "user" || source === "ai"
      ? "justify-end"
      : "justify-start"
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Conversation History</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col">
        <div className="relative flex-grow overflow-y-auto mb-2 space-y-4 sm:space-y-6 px-1 h-[calc(100%-140px)]">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className={getMessageStyles(message.source)}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 mt-1",
                  getMessageAlignment(message.source)
                )}
              >
                <span className="text-xs text-muted-foreground">
                  {message.createdAt.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                  {message.source.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sendMethod === "email" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSendMethod("email")}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send via Email</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sendMethod === "sms" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSendMethod("sms")}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send via SMS</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      sendMethod === "instagram_dm" ? "default" : "ghost"
                    }
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSendMethod("instagram_dm")}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send via Instagram DM</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={sendMethod === "tiktok_dm" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSendMethod("tiktok_dm")}
                  >
                    <div className="h-4 w-4">
                      <TikTokIcon color="currentColor" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send via TikTok DM</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none pr-12"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSend}
                    size="icon"
                    className="absolute bottom-2 right-2 h-8 w-8"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message (Enter)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
