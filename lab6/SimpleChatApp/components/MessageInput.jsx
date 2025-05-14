import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handlePress = () => {
    onSend(text);
    setText("");
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    marginTop: 8,
    paddingInline: 16,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  onfocus: {
    marginBlockEnd: 200,
  },
});

export default MessageInput;
