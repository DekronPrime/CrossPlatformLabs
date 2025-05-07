import { useLocalSearchParams, Stack, router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Ban, Save } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserFormModal() {
  const { id } = useLocalSearchParams();
  const database = useSQLiteContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    const result = await database.getFirstAsync<{
      id: number;
      name: string;
      email: string;
    }>("SELECT * FROM users WHERE id = ?", [parseInt(id as string)]);
    if (result) {
      setName(result.name);
      setEmail(result.email);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email) return;
    try {
      if (editMode) {
        await database.runAsync(
          "UPDATE users SET name = ?, email = ? WHERE id = ?",
          [name, email, parseInt(id as string)]
        );
      } else {
        await database.runAsync(
          "INSERT INTO users (name, email) VALUES (?, ?)",
          [name, email]
        );
      }
      router.back();
    } catch (error) {
      console.error("DB error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: editMode ? "Edit User" : "Add User" }} />
      <Text style={styles.title}>
        {editMode
          ? "Update the following fields"
          : "Fill in the following fields"}
      </Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.button, { backgroundColor: "tomato" }]}
        >
          <Ban color="white" size={24} />
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: "dodgerblue" }]}
        >
          <Save color="white" size={24} />
          <Text style={styles.buttonText}>{editMode ? "Update" : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  form: { gap: 10, marginVertical: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
