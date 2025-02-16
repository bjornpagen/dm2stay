"use client"

import { env } from "@/env"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : "http://localhost:3000"
})
