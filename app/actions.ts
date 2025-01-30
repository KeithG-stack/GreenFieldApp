import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
dotenv.config();
export async function getData() {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    const sql = neon(process.env.DATABASE_URL);
    const data = await sql`...`;
    return data;
}