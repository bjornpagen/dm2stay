import "server-only"
import { ApifyClient } from "apify-client"
import { env } from "@/env"
import { inngest } from "@/inngest/client"

const ACTOR_ID = "PD6Eb2AlmsXqGxffs"

const client = new ApifyClient({ token: env.APIFY_API_TOKEN })
const airbnbListingScraper = client.actor(ACTOR_ID)

export const queue = inngest.createFunction(
  { id: "apify-scrape-queued" },
  { event: "apify/scrape.queued" },
  async ({ event }) => {
    const { url } = event.data

    const input = {
      startUrls: [{ url }]
    }

    const run = await airbnbListingScraper.start(input, {
      webhooks: [
        {
          eventTypes: ["ACTOR.RUN.SUCCEEDED"],
          requestUrl: env.APIFY_SCRAPE_SUCCEEDED_WEBHOOK_URL
        }
      ]
    })

    return { runId: run.id }
  }
)
