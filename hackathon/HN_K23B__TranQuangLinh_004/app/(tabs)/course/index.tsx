import { Ionicons } from "@expo/vector-icons";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React from "react";
import {ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View, Switch} from "react-native";
import { useCourses } from "../../../hooks/useCourses";
import { Course, CourseStatus } from "../../../types";
const getStatusStyle = (status: CourseStatus) => {
  switch (status) {
    case "Đang hoạt động":
      return {
        color: "#38A169",
      };
    case "Ngừng hoạt động":
      return {
        color: "#E53E3E",
      };
  }
};

export default function CourseListScreen() {
  const router = useRouter();
  const { courses, loading, deleteCourse, refreshCourses, updateCourseStatus } = useCourses();

  useFocusEffect(
    React.useCallback(() => {
      refreshCourses();
    }, [refreshCourses])
  );

  const handleDeletePress = (id: string) => {
    Alert.alert("Xóa khóa học", "Bạn có chắc chắn muốn xóa khóa học này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", onPress: () => deleteCourse(id), style: "destructive" },
    ]);
  };

  const renderItem = ({ item }: { item: Course }) => {
    const handleToggleStatus = () => {
      const newStatus = item.status === "Đang hoạt động" ? "Ngừng hoạt động" : "Đang hoạt động";
      updateCourseStatus(item.id, newStatus);
    };
    const statusStyle = getStatusStyle(item.status);

    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>
            {item.price.toLocaleString("vi-VN")} VNĐ
          </Text>
          <View style={styles.statusBadge}>
            <Text style={{ color: statusStyle.color, fontWeight: "bold" }}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Switch
            value={item.status === "Đang hoạt động"}
            onValueChange={handleToggleStatus}
            trackColor={{ false: "#5c5c5cff", true: "#3880a1ff" }}
            thumbColor={item.status === "Đang hoạt động" ? "#38A169" : "#dfdfdfff"}
            style={{ marginRight: 15 }}
          />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/course/edit",
                params: { id: item.id },
              })
            }
          >
            <Ionicons name="pencil-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => handleDeletePress(item.id)}
          >
            <Ionicons name="trash-outline" size={24} color="#E53E3E" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("/(tabs)/course/add")}>
              <Ionicons name="add-circle" size={32} color="#38A169" />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Chưa có khóa học nào.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  itemContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPrice: { fontSize: 16, color: "gray", marginVertical: 4 },
  statusBadge: {
    marginTop: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});