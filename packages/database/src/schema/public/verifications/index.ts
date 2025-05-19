import { Snowflake } from '@theinternetfolks/snowflake';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';

export const verifications = pgTable('verifications', {
  id: text('id')
    .primaryKey()
    .$default(() => Snowflake.generate()),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
});

export type SelectVerification = typeof verifications.$inferSelect;
export type InsertVerification = typeof verifications.$inferInsert;

export const ZodSelectVerification = createSelectSchema(verifications);
export const ZodInsertVerification = createInsertSchema(verifications);
export const ZodUpdateVerification = createUpdateSchema(verifications);
