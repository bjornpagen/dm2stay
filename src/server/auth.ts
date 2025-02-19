import "server-only"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/server/db"
import { env } from "@/env"
import { nextCookies } from "better-auth/next-js"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

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
  advanced: {
    generateId: false
  }
})

async function getSession() {
  const reqHeaders = await headers()
  return auth.api.getSession({
    headers: reqHeaders
  })
}

export async function getUserId() {
  const session = await getSession()
  const userId = session?.user.id
  if (!userId) {
    redirect("/signin")
  }
  return userId
}
