import "server-only"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/server/db"
import { env } from "@/env"
import { nextCookies } from "better-auth/next-js"
import { headers } from "next/headers"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : "http://localhost:3000",
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  advanced: {
    generateId: false
  }
})

export async function getSession() {
  const reqHeaders = await headers()
  return auth.api.getSession({
    headers: reqHeaders
  })
}
