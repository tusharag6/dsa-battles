import { migrate } from "drizzle-orm/postgres-js/migrator";
import config from "../../../drizzle.config";
import env from "../env";
import { connection, db } from "../index";

if (!env.DB_MIGRATING) {
  throw new Error(
    'You must set DB_MIGRATING to "true" when running migrations'
  );
}

async function main() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  await migrate(db, { migrationsFolder: config.out! });

  await connection.end();
}

main();
