import React from "react";
import { FlatList, StyleSheet } from "react-native";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Message text={item.text} timestamp={item.timestamp} />
      )}
      inverted
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    textAlign: "right",
    backgroundColor: "lightgray",
    width: "100%",
  },
});

export default MessageList;
