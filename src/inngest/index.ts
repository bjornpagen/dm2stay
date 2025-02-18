import { helloWorld } from "@/inngest/hello-world"
import { queue, completed } from "@/inngest/apify"
import { messageReceived } from "@/inngest/agent"
import { sendTestMessage } from "@/inngest/test"

export default [helloWorld, queue, completed, messageReceived, sendTestMessage]
