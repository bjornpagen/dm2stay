import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    BETTER_AUTH_SECRET: z.string(),
    VERCEL_URL: z.string().optional(),
    APIFY_API_TOKEN: z.string(),
    APIFY_SCRAPE_SUCCEEDED_WEBHOOK_URL: z.string().url(),
    POSTMARK_API_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    DM2STAY_API_SECRET: z.string(),
    INSTAGRAM_APP_ID: z.string(),
    INSTAGRAM_APP_SECRET: z.string(),
    INSTAGRAM_WEBHOOK_SECRET: z.string()
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    VERCEL_URL: process.env.VERCEL_URL,
    APIFY_API_TOKEN: process.env.APIFY_API_TOKEN,
    APIFY_SCRAPE_SUCCEEDED_WEBHOOK_URL:
      process.env.APIFY_SCRAPE_SUCCEEDED_WEBHOOK_URL,
    POSTMARK_API_KEY: process.env.POSTMARK_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DM2STAY_API_SECRET: process.env.DM2STAY_API_SECRET,
    INSTAGRAM_APP_ID: process.env.INSTAGRAM_APP_ID,
    INSTAGRAM_APP_SECRET: process.env.INSTAGRAM_APP_SECRET,
    INSTAGRAM_WEBHOOK_SECRET: process.env.INSTAGRAM_WEBHOOK_SECRET
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
})
