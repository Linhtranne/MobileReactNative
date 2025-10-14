import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DUMMY_EMPLOYEES, Employee } from "../../../data/mockData";
import baseUrl from "@/apis/baseURL";

export default function EmployeeListScreen() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const getAllEmployees = async () => {
      try {
        const response = await baseUrl.get("/employees/all");
        setEmployees(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllEmployees();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Xác nhận xóa", "Bạn có chắc chắn xóa nhân viên này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            await baseUrl.delete(`/employees/${id}`);
            Alert.alert("Thành công!", "Xóa nhân viên thành công!");
            const newEmployees = employees.filter((employee) => employee.id !== id);
            setEmployees(newEmployees);
          } catch (error) {
            console.log(error);
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Danh sách Nhân viên",
          headerRight: () => (
            <Link href="/employees/add" asChild>
              <TouchableOpacity>
                <Ionicons name="add-circle" size={32} color="tomato" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }: { item: Employee }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>
                {item.employeeName} ({item.employeeCode})
              </Text>
              <Text style={styles.itemPosition}>{item.positionName}</Text>
            </View>
            <View style={styles.itemActions}>
              <Link
                href={{
                  pathname: "/employees/[id]",
                  params: { id: item.id.toString() },
                }}
                asChild
              >
                <TouchableOpacity>
                  <Ionicons name="pencil" size={24} color="#007AFF" />
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ color: "red", textAlign: "center" }}>
            Danh sách trống!
          </Text>
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
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold" },
  itemPosition: { fontSize: 14, color: "gray", marginTop: 4 },
  itemActions: { flexDirection: "row", alignItems: "center" },
});
