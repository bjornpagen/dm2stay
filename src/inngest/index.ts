import { helloWorld } from "@/inngest/hello-world"
import { queue, completed } from "@/inngest/apify"
import { messageReceived } from "@/inngest/agent"
import { sendTestMessage } from "@/inngest/test"
import { storeGuestInfo, createBookingIntent } from "@/inngest/guest"

export default [
  helloWorld,
  queue,
  completed,
  messageReceived,
  sendTestMessage,
  storeGuestInfo,
  createBookingIntent
]
