import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contactsTable = pgTable("contacts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull().unique(),
});

export const foldersTable = pgTable("folders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  path: text().notNull().unique(),
});

export const emailsTable = pgTable("emails", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sender: integer().references(() => contactsTable.id).notNull(),
  recipient: integer().references(() => contactsTable.id).notNull(),
  subject: text().notNull(),
  body: text().notNull(),
  sentAt: timestamp().notNull(),
  folderId: integer().references(() => foldersTable.id).notNull(),
  starred: boolean().notNull().default(false),
  needsAction: boolean().notNull().default(false),
});