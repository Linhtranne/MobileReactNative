import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function PositionLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Vị trí",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => router.push("/position/add-position")}
            >
              <FontAwesome6 name="circle-plus" size={22} color="#35C759" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="add-position"
        options={{ title: "Thêm vị trí mới" }}
      />
      <Stack.Screen name="edit-position" options={{ title: "Sửa vị trí" }} />
      <Stack.Screen
        name="detail-position"
        options={{ title: "Chi tiết vị trí" }}
      />
    </Stack>
  );
}
