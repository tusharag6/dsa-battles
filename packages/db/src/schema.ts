import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
export const matchStatus = pgEnum("status", [
  "not-started",
  "ongoing",
  "completed",
]);
const matchesTable = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  player1: varchar("player1", { length: 255 }).notNull(),
  player2: varchar("player2", { length: 255 }).notNull(),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime"),
  status: matchStatus("status").notNull().default("not-started"),
});

export { matchesTable };
