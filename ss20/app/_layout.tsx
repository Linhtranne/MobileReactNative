import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  // Simple stack layout for expo-router routes
  return <Stack screenOptions={{ headerShown: false }} />;
}
