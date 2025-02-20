"use server"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq, asc } from "drizzle-orm"
import { inngest } from "@/inngest/client"

const TEST_PROSPECT_ID = "testtesttesttesttesttest"
const TEST_USER_EMAIL = "bjorn.pagen@gauntletai.com"

export async function sendTestMessage(content: string) {
  const user = await db.query.user.findFirst({
    where: eq(schema.user.email, TEST_USER_EMAIL)
  })

  if (!user) {
    throw new Error("Test user not found")
  }

  await db
    .insert(schema.prospect)
    .values({
      id: TEST_PROSPECT_ID,
      name: "Test Prospect"
    })
    .onConflictDoNothing({ target: schema.prospect.id })

  const message = await db
    .insert(schema.message)
    .values({
      content,
      source: "test",
      createdAt: new Date(),
      prospectId: TEST_PROSPECT_ID,
      userId: user.id
    })
    .returning()

  await inngest.send({
    name: "test/message.send",
    data: { content }
  })

  return message[0]
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
