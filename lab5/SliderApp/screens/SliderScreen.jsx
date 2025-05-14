import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export const isAboveThreshold = (value, threshold = 50) => {
  return value > threshold;
};

export default function SliderScreen() {
  const [value, setValue] = useState(25);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Value: {value}</Text>
      <Slider
        testID="slider"
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        step={1}
        onValueChange={setValue}
        accessibilityRole="adjustable"
      />
      <Text>
        {isAboveThreshold(value)
          ? "Above threshold"
          : "Below or equal to threshold"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginBlock: "auto",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
