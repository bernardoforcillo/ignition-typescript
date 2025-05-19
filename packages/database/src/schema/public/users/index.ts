import { Snowflake } from '@theinternetfolks/snowflake';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$default(() => Snowflake.generate()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  stripeCustomerId: text('stripe_customer_id'),
});

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const ZodSelectUser = createSelectSchema(users);
export const ZodInsertUser = createInsertSchema(users);
export const ZodUpdateUser = createUpdateSchema(users);
