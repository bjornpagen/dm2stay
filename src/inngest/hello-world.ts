import { inngest } from "@/inngest/client"

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" as const },
  async ({ event, step }) => {
    const { name } = event.data
    await step.sleep("wait-a-moment", "1s")
    return { message: `Hello ${name}!` }
  }
)
