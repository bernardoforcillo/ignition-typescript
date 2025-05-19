import { type Config, defineConfig } from 'drizzle-kit';
import {
  constructErrorMessages,
  validateEnviroment,
} from './src/scripts/enviroment';

const validatedEnviroment = validateEnviroment();

if (validatedEnviroment.error) {
  const errorMessages = constructErrorMessages(
    validatedEnviroment.error.errors,
  );
  throw new Error(
    `\n\n > Error in loading environment variables:\n${errorMessages.join(
      '\n',
    )}\n`,
  );
}
console.info(' > Environment variables loaded successfully');

const config: Config = {
  schema: './src/schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URI,
  },
  verbose: true,
  strict: true,
  migrations: {
    schema: 'drizzle',
    table: 'migrations',
  },
};
export default defineConfig(config);
