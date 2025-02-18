import { inngest } from "@/inngest/client"
import { db } from "@/server/db"
import * as schema from "@/server/db/schema"
import { eq } from "drizzle-orm"

const TEST_PROSPECT_ID = "testtesttesttesttesttest"

export const sendTestMessage = inngest.createFunction(
  { id: "test-message-send" },
  { event: "test/message.send" },
  async ({ event }) => {
    const { content } = event.data

    const user = await db.query.user.findFirst({
      where: eq(schema.user.email, "bjorn.pagen@gauntletai.com")
    })
    if (!user) {
      throw new Error("Test user not found")
    }

    const messageId = await db.transaction(async (tx) => {
      await tx
        .insert(schema.prospect)
        .values({
          id: TEST_PROSPECT_ID
        })
        .onConflictDoUpdate({
          target: schema.prospect.id,
          set: {
            updatedAt: new Date()
          }
        })

      const message = await tx
        .insert(schema.message)
        .values({
          source: "test",
          content,
          prospectId: TEST_PROSPECT_ID,
          userId: user.id
        })
        .returning()
        .then((rows) => rows[0])
      if (!message) {
        throw new Error("Failed to create test message")
      }

      return message.id
    })

    return inngest.send({
      name: "agent/message.received",
      data: { messageId }
    })
  }
)
