import { SQLiteProvider } from "expo-sqlite";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUsersTable } from "./db/init";

export default function RootLayout() {
  return (
    <>
      <SQLiteProvider databaseName="test.db" onInit={createUsersTable}>
        <Stack>
          <Stack.Screen
            name="screens/UserFormModal"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </SQLiteProvider>
      <StatusBar style="auto" />
    </>
  );
}
