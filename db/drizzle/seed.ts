
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { users } from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error('Database URL not found. Please set DRIZZLE_DATABASE_URL in your environment variables.');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// async function main(){
//     console.log("Seeding.....")
//     for(let index = 0; index<10; index++){
//         const user = await db.insert(users).values{

//         }
//     }
// }