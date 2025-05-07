import { SQLiteDatabase } from "expo-sqlite";

export const createUsersTable = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )`
    );
    console.log("Users table ensured.");
  } catch (error) {
    console.error("Failed to create users table", error);
  }
};
