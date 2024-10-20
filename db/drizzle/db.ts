// import { Pool } from "pg";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Database URL not found. Please set DRIZZLE_DATABASE_URL in your environment variables.",
  );
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

await client.connect();
// await pool.connect();
// const db = drizzle(client, { schema , logger: true});
const db = drizzle(client, { schema });
// const db = drizzle(pool, { schema });

export default db;

// Setup lucia adapter
export const luciaAdapter = new DrizzlePostgreSQLAdapter(
  db,
  schema.sessions,
  schema.users,
);
