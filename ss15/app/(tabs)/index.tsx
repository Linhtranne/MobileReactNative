import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./home-screen.styles";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: true, title: "Home" }} />
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to the Employee Management App!
        </Text>
      </View>
    </SafeAreaView>
  );
}
