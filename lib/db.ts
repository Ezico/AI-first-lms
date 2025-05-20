import { neon } from "@neondatabase/serverless";

// Initialize database connection
export const sql = neon(process.env.DATABASE_URL || "");
// For backward compatibility
export const db = sql;

// Helper function to execute SQL queries with parameters
export async function executeQuery(queryText: string, params: any[] = []) {
  try {
    // Use the query method for parameterized queries
    const result = await sql.query(queryText, params);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

// Helper function for raw SQL queries using tagged template literals
export async function rawQuery(
  strings: TemplateStringsArray,
  ...values: any[]
) {
  try {
    // Use tagged template literals for raw queries
    const result = await sql(strings, ...values);
    return result;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}
