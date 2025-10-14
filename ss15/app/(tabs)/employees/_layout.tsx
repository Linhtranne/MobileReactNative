import { Stack } from "expo-router";

export default function EmployeesStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="add"
        options={{ title: "Add New Employee", presentation: "modal" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Edit Employee", presentation: "modal" }}
      />
    </Stack>
  );
}
