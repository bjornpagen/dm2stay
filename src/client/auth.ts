"use client"

import { env } from "@/env"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"
})
