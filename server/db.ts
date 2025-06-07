import { neonConfig } from '@neondatabase/serverless';
import { drizzle } from "drizzle-orm/mysql2";
import ws from "ws";
// import * as schema from "@shared/schema";
import mysql from "mysql2/promise";
neonConfig.webSocketConstructor = ws;

export const pool = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,  
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

export const db = drizzle({ client: pool });