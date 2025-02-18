import { createId } from "@paralleldrive/cuid2"
import {
  pgSchema,
  timestamp,
  text,
  boolean,
  index,
  check,
  uniqueIndex,
  integer,
  jsonb,
  primaryKey,
  date
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { relations } from "drizzle-orm"
import type { ListingData } from "@/server/types"

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
    tokenIdx: index("session_token_idx").on(table.token),
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
    identifierIdx: index("verification_identifier_idx").on(table.identifier),
    idLengthCheck: check(
      "verification_id_length",
      sql`length(${table.id}) = 24`
    )
  })
)

// END OF BETTERAUTH TABLES

export const file = schema.table(
  "file",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check("file_id_length", sql`length(${table.id}) = 24`)
  })
)

export const airbnbListing = schema.table("airbnb_listing", {
  airbnbId: text("airbnb_id").primaryKey().notNull(),
  airbnbUrl: text("airbnb_url")
    .notNull()
    .generatedAlwaysAs(sql`'https://www.airbnb.com/rooms/' || "airbnb_id"`),
  data: jsonb("data").$type<ListingData>(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at", { withTimezone: false })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
})

export const listing = schema.table(
  "listing",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    airbnbId: text("airbnb_id").references(() => airbnbListing.airbnbId),
    defaultDailyPrice: integer("default_daily_price"),
    defaultWeeklyPrice: integer("default_weekly_price"),
    defaultMonthlyPrice: integer("default_monthly_price"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check("listing_id_length", sql`length(${table.id}) = 24`),
    priceCheck: check(
      "listing_price_check",
      sql`${table.defaultMonthlyPrice} <= ${table.defaultWeeklyPrice} * 4 AND ${table.defaultWeeklyPrice} <= ${table.defaultDailyPrice} * 7`
    ),
    userAirbnbIdx: uniqueIndex("listing_user_airbnb_idx").on(
      table.userId,
      table.airbnbId
    )
  })
)

export const listingPrice = schema.table(
  "listing_price",
  {
    listingId: text("listing_id")
      .notNull()
      .references(() => listing.id),
    date: date("date", { mode: "date" }).notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    pk: primaryKey({ columns: [table.listingId, table.date] })
  })
)

export const listingPriceRelations = relations(listingPrice, ({ one }) => ({
  listing: one(listing, {
    fields: [listingPrice.listingId],
    references: [listing.id]
  })
}))

export const listingRelations = relations(listing, ({ one, many }) => ({
  user: one(user, {
    fields: [listing.userId],
    references: [user.id]
  }),
  airbnbListing: one(airbnbListing, {
    fields: [listing.airbnbId],
    references: [airbnbListing.airbnbId]
  }),
  prices: many(listingPrice),
  bookings: many(booking)
}))

export const prospectSource = schema.enum("prospect_source", [
  "instagram_dm",
  "tiktok_dm",
  "email",
  "phone_call"
])

export const prospect = schema.table(
  "prospect",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    instagramHandle: text("instagram_handle"),
    tiktokHandle: text("tiktok_handle"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check("prospect_id_length", sql`length(${table.id}) = 24`),
    emailIdx: uniqueIndex("prospect_email_idx").on(table.email),
    phoneIdx: uniqueIndex("prospect_phone_idx").on(table.phone),
    instagramHandleIdx: uniqueIndex("prospect_instagram_handle_idx").on(
      table.instagramHandle
    ),
    tiktokHandleIdx: uniqueIndex("prospect_tiktok_handle_idx").on(
      table.tiktokHandle
    )
  })
)

export const messageType = schema.enum("message_type", [
  "prospect",
  "ai",
  "user"
])

export const message = schema.table(
  "message",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    type: messageType("type").notNull(),
    content: text("content").notNull(),
    prospectId: text("prospect_id")
      .notNull()
      .references(() => prospect.id),
    userId: text("user_id").references(() => user.id),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check("message_id_length", sql`length(${table.id}) = 24`),
    userCheck: check(
      "message_user_check",
      sql`${table.type} <> 'user' OR ${table.userId} IS NOT NULL`
    ),
    aiCheck: check(
      "message_ai_check",
      sql`${table.type} <> 'ai' OR ${table.userId} IS NULL`
    ),
    prospectIdIdx: index("message_prospect_id_idx").on(table.prospectId),
    userIdIdx: index("message_user_id_idx").on(table.userId),
    typeIdx: index("message_type_idx").on(table.type)
  })
)

export const messageRelations = relations(message, ({ one }) => ({
  prospect: one(prospect, {
    fields: [message.prospectId],
    references: [prospect.id]
  }),
  user: one(user, {
    fields: [message.userId],
    references: [user.id]
  })
}))

export const booking = schema.table(
  "booking",
  {
    id: text("id").primaryKey().notNull().$default(createId),
    prospectId: text("prospect_id")
      .notNull()
      .references(() => prospect.id),
    listingId: text("listing_id")
      .notNull()
      .references(() => listing.id),
    checkIn: timestamp("check_in", { withTimezone: false }).notNull(),
    checkOut: timestamp("check_out", { withTimezone: false }).notNull(),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdateFn(() => new Date())
  },
  (table) => ({
    idLengthCheck: check("booking_id_length", sql`length(${table.id}) = 24`),
    prospectIdIdx: index("booking_prospect_id_idx").on(table.prospectId),
    listingIdIdx: index("booking_listing_id_idx").on(table.listingId),
    dateCheck: check(
      "booking_date_check",
      sql`${table.checkOut} > ${table.checkIn}`
    ),
    paymentIntentIdx: uniqueIndex("booking_payment_intent_idx").on(
      table.stripePaymentIntentId
    )
  })
)

export const bookingRelations = relations(booking, ({ one }) => ({
  prospect: one(prospect, {
    fields: [booking.prospectId],
    references: [prospect.id]
  }),
  listing: one(listing, {
    fields: [booking.listingId],
    references: [listing.id]
  })
}))

export const prospectRelations = relations(prospect, ({ many }) => ({
  bookings: many(booking),
  messages: many(message)
}))
