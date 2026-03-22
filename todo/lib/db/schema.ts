import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const listsTable = pgTable("lists", {
  id:        serial("id").primaryKey(),
  name:      text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const chores = pgTable("chores", {
  id:        serial("id").primaryKey(),
  listId:    integer("list_id").references(() => listsTable.id),
  title:     text("title").notNull(),
  done:      boolean("done").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type Chore = typeof chores.$inferSelect
export type NewChore = typeof chores.$inferInsert