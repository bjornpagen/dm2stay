import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

import { db } from "@/server/db"
import { sql } from "drizzle-orm"
import { schema } from "@/server/db/schema"

db.execute(sql.raw(`DROP SCHEMA IF EXISTS ${schema.schemaName} CASCADE`))
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error dropping schema:", error)
    process.exit(1)
  })
