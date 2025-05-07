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
import { User } from "../types";
import UserListItem from "../components/UserListItem";

export default function HomeScreen() {
  const db = useSQLiteContext();
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    try {
      const result = await db.getAllAsync<User>("SELECT * FROM users");
      setUsers(result);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [])
  );

  const handleDelete = (id: number) => {
    Alert.alert("Delete user", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await db.runAsync("DELETE FROM users WHERE id = ?", [id]);
          loadUsers();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Home Page" }} />
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity
          onPress={() => router.push("/screens/UserFormModal")}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserListItem
            user={item}
            onEdit={() =>
              router.push({
                pathname: "/screens/UserFormModal",
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
