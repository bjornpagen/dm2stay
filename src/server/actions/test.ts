"use server"

import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq, asc, and, not } from "drizzle-orm"
import { inngest } from "@/inngest/client"

const TEST_PROSPECT_ID = "testtesttesttesttesttest"

export async function sendTestMessage(content: string) {
  await inngest.send({
    name: "test/message.send",
    data: { content }
  })
}

export async function getTestMessages() {
  return db
    .select({
      id: schema.message.id,
      source: schema.message.source,
      content: schema.message.content,
      createdAt: schema.message.createdAt
    })
    .from(schema.message)
    .where(
      and(
        eq(schema.message.prospectId, TEST_PROSPECT_ID),
        not(eq(schema.message.content, ""))
      )
    )
    .orderBy(asc(schema.message.createdAt))
}
