import { Stack, router, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Ban, Save } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimeEntryModal() {
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [project, setProject] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [pickerMode, setPickerMode] = useState<"start" | "end" | null>(null);

  useEffect(() => {
    if (id) {
      setEditMode(true);
      loadEntry();
    }
  }, [id]);

  const loadEntry = async () => {
    const entry = await db.getFirstAsync<{
      id: number;
      title: string;
      start_time: string;
      end_time: string;
      project: string;
    }>("SELECT * FROM time_entries WHERE id = ?", [parseInt(id as string)]);

    if (entry) {
      setTitle(entry.title);
      setStartTime(new Date(entry.start_time));
      setEndTime(new Date(entry.end_time));
      setProject(entry.project);
    }
  };

  const handleConfirm = (date: Date) => {
    if (pickerMode === "start") setStartTime(date);
    else if (pickerMode === "end") setEndTime(date);
    setPickerMode(null);
  };

  const formatDateTime = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().slice(0, 16).replace("T", " ");
  };

  const handleSubmit = async () => {
    if (!title || !startTime || !endTime) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const startIso = startTime.toISOString();
      const endIso = endTime.toISOString();

      if (editMode) {
        await db.runAsync(
          `UPDATE time_entries SET title = ?, start_time = ?, end_time = ?, project = ? WHERE id = ?`,
          [title, startIso, endIso, project, parseInt(id as string)]
        );
      } else {
        await db.runAsync(
          `INSERT INTO time_entries (title, start_time, end_time, project) VALUES (?, ?, ?, ?)`,
          [title, startIso, endIso, project]
        );
      }

      router.back();
    } catch (error) {
      console.error("DB error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{ title: editMode ? "Edit Time Entry" : "Add Time Entry" }}
      />
      <Text style={styles.title}>
        {editMode ? "Update time entry" : "Fill in the following fields"}
      </Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => setPickerMode("start")}
          style={styles.pickerInput}
        >
          <Text style={{ color: startTime ? "#000" : "#888" }}>
            {startTime ? formatDateTime(startTime) : "Select start time"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPickerMode("end")}
          style={styles.pickerInput}
        >
          <Text style={{ color: endTime ? "#000" : "#888" }}>
            {endTime ? formatDateTime(endTime) : "Select end time"}
          </Text>
        </TouchableOpacity>

        <TextInput
          placeholder="Project"
          value={project}
          onChangeText={setProject}
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

      <DateTimePickerModal
        isVisible={pickerMode !== null}
        mode="datetime"
        date={
          pickerMode === "start"
            ? startTime || new Date()
            : endTime || new Date()
        }
        onConfirm={handleConfirm}
        onCancel={() => setPickerMode(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  form: { gap: 10, marginVertical: 20 },
  title: { fontSize: 22, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  pickerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    justifyContent: "center",
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
