import { inngest } from "@/server/inngest"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" as const },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s")
    return { message: `Hello ${event.data.name}!` }
  }
)
