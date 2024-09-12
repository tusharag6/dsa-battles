import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config();

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number.parseInt(process.env.POSTGRES_PORT || "5432"),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || "dsa-battles",
  },
  verbose: true,
  strict: true,
});
