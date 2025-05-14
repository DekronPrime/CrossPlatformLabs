import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  Button,
} from "react-native";
import MessageInput from "./components/MessageInput";
import MessageList from "./components/MessageList";

export default function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = (text) => {
    if (text.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [newMessage, ...prev]);
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.chatContainer}>
          <MessageList messages={messages} />
          <View style={styles.clearButtonContainer}>
            <Button
              title="Clear Chat"
              color="red"
              style={styles.clearButton}
              onPress={handleClear}
            />
          </View>
        </View>
        <MessageInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "93%",
  },
  chatContainer: {
    flex: 1,
  },
  clearButtonContainer: {
    margin: 8,
    alignSelf: "flex-start",
  },
  clearButton: {
    borderRadius: 16,
  },
});
