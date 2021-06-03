import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FooterComponent() {
  return (
    <View style={styles.footer}>
      <Text style={{ color: "white" }}>Szymon Biliński & Andrzej Osika ®</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
