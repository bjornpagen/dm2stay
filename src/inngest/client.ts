import { EventSchemas, type GetEvents, Inngest } from "inngest"
import { z } from "zod"

const events = {
  "test/hello.world": {
    data: z.object({
      name: z.string()
    })
  },
  "apify/scrape.queued": {
    data: z.object({
      url: z
        .string()
        .url()
        .refine((url) => {
          try {
            const { hostname } = new URL(url)
            return hostname === "www.airbnb.com" || hostname === "airbnb.com"
          } catch {
            return false
          }
        }, "URL must be from airbnb.com")
    })
  },
  "apify/scrape.completed": {
    data: z.any()
  }
}

export const inngest = new Inngest({
  id: "dm2stay",
  schemas: new EventSchemas().fromZod(events)
})

export type Events = GetEvents<typeof inngest>
