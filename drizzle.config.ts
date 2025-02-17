import type { Config } from "drizzle-kit"
import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  schemaFilter: ["dm2stay"]
} satisfies Config
