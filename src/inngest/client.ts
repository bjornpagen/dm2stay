import { EventSchemas, type GetEvents, Inngest } from "inngest"
import { z } from "zod"
const events = {
  "test/hello.world": {
    data: z.object({
      name: z.string()
    })
  }
}

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "dm2stay",
  schemas: new EventSchemas().fromZod(events)
})

export type Events = GetEvents<typeof inngest>
