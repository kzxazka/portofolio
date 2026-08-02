import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const achievements = pgTable("achievements", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(), // stored as string e.g., 'Dec 2025'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url"),
  repository: text("repository"),
  published: boolean("published").default(false).notNull(),
  imageUrl: text("image_url"), // URL pointing to Supabase Storage bucket
  imageUrl2: text("image_url_2"), // Optional secondary screenshot
  imageUrl3: text("image_url_3"), // Optional tertiary screenshot
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
