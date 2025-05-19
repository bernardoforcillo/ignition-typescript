import {} from 'drizzle-orm/';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '~/schema';

export const client = postgres(process.env.DATABASE_URI as string, {
  max: 512,
});
export const database = drizzle(client, {
  schema,
  logger: process.env.NODE_ENV !== 'production',
});
