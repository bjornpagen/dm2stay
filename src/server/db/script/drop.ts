import { loadEnvConfig } from "@next/env"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

import { db } from "@/server/db"
import { sql, getTableName } from "drizzle-orm"
import * as schema from "@/server/db/schema"

async function dropTables() {
  const tables = [
    schema.verification,
    schema.session,
    schema.account,
    schema.user
  ]

  for (const table of tables) {
    const tableName = getTableName(table)
    const exists = await db.execute(
      sql`SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'dm2stay'
        AND table_name = ${tableName}
      )`
    )
    const tableExists = exists[0]?.exists ?? false
    if (tableExists) {
      console.log(`Dropping ${tableName}...`)
      await db.execute(sql`DROP TABLE IF EXISTS ${table} CASCADE`)
      console.log(`✓ ${tableName}`)
    }
  }
}

dropTables()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error dropping tables:", error)
    process.exit(1)
  })
