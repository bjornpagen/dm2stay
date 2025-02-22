import "server-only"

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/server/db"
import { env } from "@/env"
import { nextCookies } from "better-auth/next-js"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { genericOAuth } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.VERCEL_URL
    ? `https://${env.VERCEL_URL}`
    : "http://localhost:3000",
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: "instagram",
          clientId: env.INSTAGRAM_APP_ID,
          clientSecret: env.INSTAGRAM_APP_SECRET,
          authorizationUrl: "https://www.instagram.com/oauth/authorize",
          tokenUrl: "https://api.instagram.com/oauth/access_token",
          scopes: [
            "instagram_business_basic",
            "instagram_business_manage_messages"
          ]
        }
      ]
    })
  ],
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
