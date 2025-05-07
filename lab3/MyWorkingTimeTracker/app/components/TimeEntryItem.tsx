import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TimeEntry } from "../types";
import { CalendarClock, Edit, Trash2 } from "lucide-react-native";

type Props = {
  entry: TimeEntry;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TimeEntryItem({ entry, onEdit, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <View style={styles.container}>
        <Text style={styles.title}>Task: {entry.title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>Start time</Text>
          <View style={styles.time}>
            <CalendarClock color="black" size={24} />
            <Text>{new Date(entry.start_time).toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeLabel}>End time</Text>
          <View style={styles.time}>
            <CalendarClock color="black" size={24} />
            <Text>{new Date(entry.end_time).toLocaleString()}</Text>
          </View>
        </View>
        <Text style={styles.project}>Project: {entry.project}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Edit color="black" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Trash2 color="black" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 14,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  timeContainer: {
    color: "#666",
    display: "flex",
    justifyContent: "flex-start",
  },
  time: {
    color: "#666",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
  },
  timeLabel: {
    color: "#666",
    fontWeight: "700",
  },
  project: {
    color: "#333",
    fontWeight: "500",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
