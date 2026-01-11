import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import * as schema from "./schema.js";
import { seed } from "./seed.js";

const client = new PGlite(); // in-memory
export const db = drizzle({ client, schema });

export async function initDb() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await seed()
}
