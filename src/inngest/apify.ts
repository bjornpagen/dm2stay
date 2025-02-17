import "server-only"
import { ApifyClient } from "apify-client"
import { env } from "@/env"
import { inngest } from "@/inngest/client"

const client = new ApifyClient({ token: env.APIFY_API_TOKEN })
const airbnbListingScraper = client.actor("PD6Eb2AlmsXqGxffs")

export const queue = inngest.createFunction(
  { id: "apify-queue-scraping" },
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

export const completed = inngest.createFunction(
  { id: "apify-handle-completed" },
  { event: "apify/scrape.completed" },
  async ({ event }) => {
    const { eventData } = event.data
    const { actorRunId } = eventData

    const items = await client.dataset(actorRunId).listItems()

    return {
      success: true,
      runId: actorRunId,
      results: items
    }
  }
)
