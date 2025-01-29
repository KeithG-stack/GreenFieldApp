import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
dotenv.config();
export async function getData() {
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`...`;
    return data;
} 