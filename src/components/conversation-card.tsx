import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatTimestamp } from "@/lib/utils"

interface ConversationCardProps {
  id: number
  customerName: string
  latestMessage: string
  timestamp: Date
}

export function ConversationCard({ id, customerName, latestMessage, timestamp }: ConversationCardProps) {
  return (
    <Link href={`/customers/${id}`}>
      <Card className="hover:bg-accent transition-all duration-150 ease-in-out hover:scale-[1.01] hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">{customerName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{latestMessage}</p>
          <p className="text-xs text-muted-foreground text-right">{formatTimestamp(timestamp)}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

