// src/config/db.js
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres"; // ✅ use this
import { ENV } from "./env.js";
import * as schema from "../db/schema.js";

// Neon still works! Just using a compatible driver
const client = postgres(ENV.DB_URL, { ssl: 'require' }); 
export const db = drizzle(client, { schema });
