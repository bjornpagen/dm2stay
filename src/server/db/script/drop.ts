import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

import { db } from "@/server/db"
import { sql } from "drizzle-orm"

async function dropSchema() {
  console.log("Dropping schema dm2stay...")
  await db.execute(sql`DROP SCHEMA IF EXISTS dm2stay CASCADE`)
  console.log("✓ Schema dropped")
}

dropSchema()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error dropping schema:", error)
    process.exit(1)
  })
