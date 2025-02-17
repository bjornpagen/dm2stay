import "server-only"
import { ApifyClient } from "apify-client"
import { env } from "@/env"
import { inngest } from "@/inngest/client"
import type { Listing } from "@/server/types"

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

    const list = await airbnbListingScraper.runs().list()
    const run = list.items.find((run) => run.id === actorRunId)
    const datasetId = run?.defaultDatasetId
    if (!datasetId) {
      throw new Error("Dataset ID not found")
    }

    const { items } = await client.dataset(datasetId).listItems()
    const listingData = items[0] as unknown as Listing
    if (!listingData) {
      throw new Error("Listing data not found")
    }

    return {
      success: true,
      runId: actorRunId,
      data: listingData
    }
  }
)
