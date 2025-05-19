import { database } from '@monorepo/database/client';
import { type BetterAuthOptions, betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

const auth = betterAuth({
  appName: 'easyreport',
  database: drizzleAdapter(database, {
    provider: 'pg',
    usePlural: true,
  }),
  logger: {
    level: 'debug',
    prettyPrint: true,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI({
      disableDefaultReference: true,
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
} as BetterAuthOptions);

export { auth };
