import * as React from "react"
import { db } from "@/server/db"
import { desc, eq, sql, and } from "drizzle-orm"
import * as schema from "@/server/db/schema"
import { CustomersPage } from "@/components/customers-page"
import { getUserId } from "@/server/auth"

const getCustomers = db
  .select({
    id: schema.prospect.id,
    name: sql<string>`COALESCE(${schema.prospect.name}, 'Unnamed Customer')`,
    email: sql<string>`COALESCE(${schema.prospect.email}, 'No email')`,
    status: sql<"active" | "inactive">`CASE
      WHEN EXISTS (
        SELECT 1 FROM ${schema.booking}
        WHERE ${schema.booking.prospectId} = ${schema.prospect.id}
        AND ${schema.booking.paymentAt} IS NOT NULL
      ) THEN 'active'::text
      ELSE 'inactive'::text
    END`,
    totalBookings: sql<number>`COALESCE(
      (
        SELECT COUNT(*)
        FROM ${schema.booking}
        WHERE ${schema.booking.prospectId} = ${schema.prospect.id}
        AND ${schema.booking.paymentAt} IS NOT NULL
      ),
      0
    )`,
    totalSpent: sql<number>`0`,
    lastActive: sql<Date>`MAX(${schema.message.createdAt})`
  })
  .from(schema.prospect)
  .innerJoin(
    schema.message,
    and(
      eq(schema.message.prospectId, schema.prospect.id),
      eq(schema.message.userId, sql.placeholder("userId"))
    )
  )
  .groupBy(schema.prospect.id)
  .orderBy(desc(schema.prospect.createdAt))
  .prepare("get_customers")

export type Customer = Awaited<ReturnType<typeof getCustomers.execute>>[number]

export default function Page() {
  const userId = getUserId()
  const customers = userId.then((userId) => getCustomers.execute({ userId }))

  return (
    <React.Suspense>
      <CustomersPage customers={customers} />
    </React.Suspense>
  )
}
