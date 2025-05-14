import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Message = ({ text, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.messageBubble}>
      <Text style={styles.messageText}>{text}</Text>
      <Text style={styles.timestamp}>{formattedTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    backgroundColor: "#DCF8C6",
    padding: 10,
    paddingBlockEnd: 18,
    borderRadius: 8,
    marginInline: 10,
    marginBlockEnd: 8,
    alignSelf: "flex-end",
    maxWidth: "80%",
    minWidth: 75,
    position: "relative",
  },
  messageText: {
    fontSize: 18,
  },
  timestamp: {
    fontSize: 10,
    color: "#555",
    position: "absolute",
    right: 6,
    bottom: 4,
  },
});

export default Message;
