import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client"
import { z } from "zod"
import { env } from "@/env"

const schema = z.object({
  prospectId: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable()
})

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization")
  if (authHeader !== `Bearer ${env.DM2STAY_API_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const data = schema.parse(body)

  await inngest.send({
    name: "agent/guest.store",
    data
  })

  return NextResponse.json({ success: true })
}
