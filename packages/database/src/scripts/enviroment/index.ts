import { type ZodIssue, z } from 'zod';

export const constructErrorMessages = (errors: ZodIssue[]): string[] => {
  return errors.map((error, idx) => {
    return `   - ${error.path.join('.')} : ${error.message}`;
  });
};

const CoreEnviromentSchema = z.object({
  DATABASE_URI: z.string(),
});

export const validateEnviroment = () => {
  return CoreEnviromentSchema.safeParse(process.env);
};

export type AppEnviromentType = z.infer<typeof CoreEnviromentSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof CoreEnviromentSchema> {}
  }
}
