import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { formatTimestamp } from "@/lib/utils"

interface ConversationCardProps {
  id: number
  customerName: string
  latestMessage: string
  timestamp: Date
}

export function ConversationCard({
  id,
  customerName,
  latestMessage,
  timestamp
}: ConversationCardProps) {
  return (
    <Link href={`/customers/${id}`}>
      <Card className="mb-4 cursor-pointer hover:shadow-md transition-all duration-150">
        <CardContent className="flex flex-col p-4 space-y-1">
          <div className="flex justify-between items-start">
            <p className="text-sm font-medium">{customerName}</p>
            <p className="text-xs text-muted-foreground">
              {formatTimestamp(timestamp)}
            </p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {latestMessage}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
