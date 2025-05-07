import { SQLiteDatabase } from "expo-sqlite";

export const createTimeEntriesTable = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS time_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        start_time TEXT,
        end_time TEXT,
        project TEXT
      )`
    );
    console.log("Time entries table ensured.");
  } catch (error) {
    console.error("Failed to create time_entries table", error);
  }
};
