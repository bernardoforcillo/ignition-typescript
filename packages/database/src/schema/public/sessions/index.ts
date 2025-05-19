import { Snowflake } from '@theinternetfolks/snowflake';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { users } from '../users';

export const sessions = pgTable('sessions', {
  id: text('id')
    .primaryKey()
    .$default(() => Snowflake.generate()),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export type SelectSession = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export const ZodSelectSession = createSelectSchema(sessions);
export const ZodInsertSession = createInsertSchema(sessions);
export const ZodUpdateSession = createUpdateSchema(sessions);
