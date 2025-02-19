import * as React from "react"
import { db } from "@/server/db"
import { desc, eq, and, sql, notInArray } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { getUserId } from "@/server/auth"

import { Conversations } from "@/components/conversations-page"

const latestMessage = db
  .select({
    prospectId: schema.message.prospectId,
    maxCreatedAt: sql<Date>`MAX(${schema.message.createdAt})`.as(
      "max_created_at"
    )
  })
  .from(schema.message)
  .where(
    and(
      eq(schema.message.userId, sql.placeholder("userId")),
      notInArray(schema.message.source, ["ai", "user"])
    )
  )
  .groupBy(schema.message.prospectId)
  .as("latest_message")

const getConversations = db
  .select({
    id: schema.prospect.id,
    customerName: sql<string>`COALESCE(${schema.prospect.name}, 'Unnamed Customer')`,
    latestMessage: schema.message.content,
    timestamp: schema.message.createdAt
  })
  .from(schema.prospect)
  .innerJoin(schema.message, eq(schema.message.prospectId, schema.prospect.id))
  .innerJoin(
    latestMessage,
    and(
      eq(latestMessage.prospectId, schema.prospect.id),
      eq(latestMessage.maxCreatedAt, schema.message.createdAt)
    )
  )
  .where(
    and(
      eq(schema.message.userId, sql.placeholder("userId")),
      notInArray(schema.message.source, ["ai", "user"])
    )
  )
  .orderBy(desc(schema.message.createdAt))
  .prepare("get_conversations")

export type Conversation = Awaited<
  ReturnType<typeof getConversations.execute>
>[number]

export default function Page() {
  const userId = getUserId()
  const conversations = userId.then((userId) =>
    getConversations.execute({ userId })
  )

  return (
    <React.Suspense>
      <Conversations conversations={conversations} />
    </React.Suspense>
  )
}
