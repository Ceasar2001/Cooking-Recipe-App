// src/config/db.js
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"; // <- use this, not neon()
import { ENV } from "./env.js";
import * as schema from "../db/schema.js";

// Create postgres-js client
const client = postgres(ENV.DB_URL, { ssl: 'require' }); // ✅ Add ssl for Neon
export const db = drizzle(client, { schema });
