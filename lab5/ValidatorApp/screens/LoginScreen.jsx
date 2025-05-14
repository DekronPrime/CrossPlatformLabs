import React, { useState } from "react";

import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.length >= 6;

export default function LoginScreen() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setMessage("Invalid email format");
    } else if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters");
    } else {
      setMessage("Login successful!");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBlock: "auto",
  },

  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
