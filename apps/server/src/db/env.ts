import { config } from "dotenv";
import dotenv from "dotenv";
import { expand } from "dotenv-expand";

import { ZodError, z } from "zod";
dotenv.config();
const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  JUDGE0_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    // biome-ignore lint/complexity/noForEach: <explanation>
    error.issues.forEach((issue) => {
      message += `${issue.path[0]}\n`;
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
    // biome-ignore lint/style/noUselessElse: <explanation>
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
