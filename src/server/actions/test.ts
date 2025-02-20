"use server"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq, asc } from "drizzle-orm"

const TEST_PROSPECT_ID = "testtesttesttesttesttest"
const TEST_USER_ID = "bb3orl4mh2hsxdeh4qhihqgk"

export async function sendTestMessage(content: string): Promise<Message> {
  const message = await db
    .insert(schema.message)
    .values({
      content,
      source: "test",
      createdAt: new Date(),
      prospectId: TEST_PROSPECT_ID,
      userId: TEST_USER_ID
    })
    .returning()

  return message[0] as Message
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
    .where(eq(schema.message.prospectId, TEST_PROSPECT_ID))
    .orderBy(asc(schema.message.createdAt))
}
