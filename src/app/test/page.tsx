"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp } from "lucide-react"
import { sendTestMessage, getTestMessages } from "@/server/actions/test"

type Message = {
  id: string
  content: string
  createdAt: Date
  source:
    | "ai"
    | "user"
    | "instagram_dm"
    | "tiktok_dm"
    | "email"
    | "sms"
    | "test"
}

function MessageContent({ content }: { content: string }) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const parts = content.split(urlRegex)

  return (
    <React.Fragment>
      {parts.map((part, i) => {
        const key = `${part}-${i}`
        if (part.match(urlRegex)) {
          return (
            <a
              key={key}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {part}
            </a>
          )
        }
        return <span key={key}>{part}</span>
      })}
    </React.Fragment>
  )
}

export default function TestPage() {
  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isSending, setIsSending] = React.useState(false)
  const sendingRef = React.useRef(false)
  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  const fetchMessages = React.useCallback(async () => {
    const messages = await getTestMessages()
    setMessages(messages)
  }, [])

  React.useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  React.useEffect(() => {
    const scrollArea = scrollAreaRef.current
    if (scrollArea) {
      const observer = new MutationObserver(() => {
        scrollArea.scrollTop = scrollArea.scrollHeight
      })
      observer.observe(scrollArea, { childList: true, subtree: true })
      return () => observer.disconnect()
    }
  }, [])

  const handleSend = async () => {
    if (!message.trim() || sendingRef.current) {
      return
    }
    const trimmedMessage = message.trim()
    setMessage("")
    sendingRef.current = true
    setIsSending(true)
    try {
      await sendTestMessage(trimmedMessage)
      const messages = await getTestMessages()
      setMessages(messages)
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessage(trimmedMessage)
    } finally {
      sendingRef.current = false
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h1 className="text-xl font-semibold">Test Chat</h1>
          <p className="text-sm text-muted-foreground">Send test messages</p>
        </div>
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.source === "test" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  msg.source === "test"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="text-sm">
                  <MessageContent content={msg.content} />
                </div>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="relative max-w-3xl mx-auto">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="min-h-[44px] w-full pr-12 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-3 top-3 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={handleSend}
            disabled={isSending}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
