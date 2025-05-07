import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { router, Stack, useFocusEffect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimeEntry } from "../types";
import TimeEntryItem from "../components/TimeEntryItem";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);

  const loadTimeEntries = async () => {
    try {
      const result = await db.getAllAsync<TimeEntry>(
        "SELECT * FROM time_entries"
      );
      setTimeEntries(result);
    } catch (error) {
      console.error("Failed to load time_entries:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTimeEntries();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert("Delete time entry", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM time_entries WHERE id = ?", [id]);
          loadTimeEntries();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Home Page" }} />
      <View style={styles.header}>
        <Text style={styles.title}>Time entries</Text>
        <TouchableOpacity
          onPress={() => router.push("/screens/TimeEntryModal")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={timeEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TimeEntryItem
            entry={item}
            onEdit={() =>
              router.push({
                pathname: "/screens/TimeEntryModal",
                params: { id: item.id.toString() },
              })
            }
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
