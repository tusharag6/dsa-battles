import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
export const matchStatus = pgEnum("status", [
  "not-started",
  "ongoing",
  "completed",
]);
const matchesTable = pgTable("matches", {
  id: serial("id").primaryKey(),
  player1: varchar("player1", { length: 255 }).notNull(),
  player2: varchar("player2", { length: 255 }).notNull(),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  status: matchStatus("status").notNull().default("not-started"),
});

const problemsTable = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

const testCasesTable = pgTable("test_cases", {
  id: serial("id").primaryKey(),
  problem_id: serial("problem_id").references(() => problemsTable.id),
  input: varchar("input", { length: 255 }).notNull(),
  expected_output: varchar("expected_output", { length: 255 }).notNull(),
  is_hidden: boolean("is_hidden").notNull().default(false),
});

const submissionsTable = pgTable("submissions", {
  id: serial("id").primaryKey(),
  // user_id: serial("user_id").references(() => usersTable.id),
  problem_id: serial("problem_id").references(() => problemsTable.id),
  language_id: serial("language_id").references(() => languagesTable.id),
  source_code: varchar("source_code", { length: 255 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  execution_time: integer("execution_time"),
  memory_usage: integer("memory_usage"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

const languagesTable = pgTable("languages", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name"),
  compileCmd: varchar("compile_cmd"),
  runCmd: varchar("run_cmd"),
  sourceFile: varchar("source_file"),
  isArchived: boolean("is_archived").notNull().default(false),
});

export {
  matchesTable,
  problemsTable,
  testCasesTable,
  submissionsTable,
  languagesTable,
};
