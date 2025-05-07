import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { User } from "../types";
import { Edit, Trash2 } from "lucide-react-native";

type Props = {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserListItem({ user, onEdit, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.actionText}>
            <Edit color="black" size={24} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.actionText}>
            <Trash2 color="black" size={24} />
          </Text>
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
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  actionText: {
    fontSize: 18,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
  },
});
