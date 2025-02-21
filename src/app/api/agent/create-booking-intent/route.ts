import { NextResponse } from "next/server"
import { inngest } from "@/inngest/client"
import { z } from "zod"

const schema = z.object({
  prospectId: z.string(),
  listingId: z.string(),
  checkIn: z.string(),
  checkOut: z.string()
})

export async function POST(request: Request) {
  const body = await request.json()
  const data = schema.parse(body)

  await inngest.send({
    name: "agent/booking.create",
    data
  })

  return NextResponse.json({ success: true })
}
