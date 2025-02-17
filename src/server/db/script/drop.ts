import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

import { db } from "@/server/db"
import { sql } from "drizzle-orm"

db.execute(sql`DROP SCHEMA IF EXISTS dm2stay CASCADE`)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error dropping schema:", error)
    process.exit(1)
  })
