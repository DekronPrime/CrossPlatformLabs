import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

type FormData = {
  username: string;
};

const UsernameForm = () => {
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const isValid = /^[A-Za-z0-9]{5,15}$/.test(data.username);
    setMessage(
      isValid
        ? "✅ Username is valid"
        : "❌ Username is not valid. Use only latin letters and digits (5-15 characters length)"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter username:</Text>

      <Controller
        control={control}
        name="username"
        rules={{
          required: "Field is required",
          pattern: {
            value: /^[A-Za-z0-9]{5,15}$/,
            message: "Only latin letters and digits allowed (5-15 characters)",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
          />
        )}
      />

      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}

      <Button title="Match" onPress={handleSubmit(onSubmit)} />

      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
    gap: 12,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 6,
  },
  errorText: {
    color: "red",
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UsernameForm;
