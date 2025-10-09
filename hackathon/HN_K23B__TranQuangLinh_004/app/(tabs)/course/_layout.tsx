import { Stack } from "expo-router";

export default function ProductLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Danh sách khóa học" }} />
      <Stack.Screen
        name="add"
        options={{ title: "Thêm khóa học mới", presentation: "modal" }}
      />
      <Stack.Screen
        name="edit"
        options={{ title: "Chỉnh sửa khóa học", presentation: "modal" }}
      />
    </Stack>
  );
}