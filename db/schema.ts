import {sql} from "drizzle-orm";import {integer,sqliteTable,text} from "drizzle-orm/sqlite-core";
export const waitlistEntries=sqliteTable("waitlist_entries",{id:integer("id").primaryKey({autoIncrement:true}),name:text("name").notNull(),email:text("email").notNull().unique(),interest:text("interest"),message:text("message"),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
