import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client"
import { z } from "zod"

const schema = z.object({
  prospectId: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable()
})

export async function POST(request: Request) {
  const body = await request.json()
  const data = schema.parse(body)

  await inngest.send({
    name: "agent/guest.store",
    data
  })

  return NextResponse.json({ success: true })
}
