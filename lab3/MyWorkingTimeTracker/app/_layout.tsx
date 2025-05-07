import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createTimeEntriesTable } from "./db/init";

export default function RootLayout() {
  return (
    <>
      <SQLiteProvider databaseName="test.db" onInit={createTimeEntriesTable}>
        <Stack>
          <Stack.Screen
            name="screens/TimeEntryModal"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
