import { defineConfig } from "drizzle-kit";
import env from "./src/db/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
