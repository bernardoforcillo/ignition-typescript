import { z } from 'zod';

const AppEnviromentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'staging', 'testing'])
    .default('development'),
  PORT: z.string().default('3000'),
  BETTER_AUTH_SECRET: z.string(),
  DATABASE_URI: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

export const validateEnviroment = () => {
  return AppEnviromentSchema.safeParse(process.env);
};

export type AppEnviromentType = z.infer<typeof AppEnviromentSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof AppEnviromentSchema> {}
  }
}
