import { EventSchemas, type GetEvents, Inngest } from "inngest"
import { z } from "zod"

const events = {
  "test/hello.world": {
    data: z.object({
      name: z.string()
    })
  },
  "agent/message.received": {
    data: z.object({
      messageId: z.string()
    })
  },
  "agent/message.generated": {
    data: z.object({
      messageIds: z.array(z.string())
    })
  },
  "apify/scrape.queued": {
    data: z.object({
      airbnbId: z.string()
    })
  },
  "apify/scrape.completed": {
    data: z.object({
      userId: z.string(),
      createdAt: z.string().datetime(),
      eventType: z.enum(["ACTOR.RUN.SUCCEEDED"]),
      eventData: z.object({
        actorId: z.string(),
        actorRunId: z.string()
      })
    })
  },
  "test/message.send": {
    data: z.object({
      content: z.string()
    })
  }
}

export const inngest = new Inngest({
  id: "dm2stay",
  schemas: new EventSchemas().fromZod(events)
})

export type Events = GetEvents<typeof inngest>
