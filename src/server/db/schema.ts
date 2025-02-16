import { createId } from "@paralleldrive/cuid2"
import {
  pgSchema,
  timestamp,
  text,
  boolean,
  index,
  check,
  uniqueIndex
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"

export const schema = pgSchema("dm2stay")

export const user = schema.table(
  "user",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    emailIdx: uniqueIndex("user_email_idx").on(table.email),
    idLengthCheck: check("user_id_length", sql`length(${table.id}) = 24`)
  })
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}))

export const session = schema.table(
  "session",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: false }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    userIdIdx: index("session_user_id_idx").on(table.userId),
    idLengthCheck: check("session_id_length", sql`length(${table.id}) = 24`)
  })
)

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}))

export const account = schema.table(
  "account",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      withTimezone: false
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      withTimezone: false
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    userIdIdx: index("account_user_id_idx").on(table.userId),
    idLengthCheck: check("account_id_length", sql`length(${table.id}) = 24`)
  })
)

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}))

export const verification = schema.table(
  "verification",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { withTimezone: false }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check(
      "verification_id_length",
      sql`length(${table.id}) = 24`
    )
  })
)
