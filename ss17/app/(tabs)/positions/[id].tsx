import React from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchPositionById } from "../../../api/positions";

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams();
  const positionId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const { data, isLoading, isError } = useQuery({
    queryKey: ["position", positionId],
    queryFn: () => fetchPositionById(positionId),
    enabled: !!positionId,
  });

  if (isLoading) return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  if (isError || !data) return <Text style={styles.errorText}>Không tìm thấy vị trí.</Text>;

  const position = data.data;
  const isActive = position.positionStatus === "ACTIVE";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Tên vị trí</Text>
        <Text style={styles.valueName}>{position.positionName}</Text>

        <Text style={styles.label}>Mô tả</Text>
        <Text style={styles.valueDescription}>{position.description}</Text>

        <Text style={styles.label}>Trạng thái</Text>
        <Text style={[styles.valueStatus, { color: isActive ? "#2F855A" : "#C53030" }]}>
          {isActive ? "Đang hoạt động" : "Không hoạt động"}
        </Text>
        {/* Hiển thị thêm các trường khác nếu có */}
        <Text style={styles.label}>ID</Text>
        <Text>{position.id}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 3,
  },
  label: { fontSize: 16, color: "gray", marginTop: 20 },
  valueName: { fontSize: 28, fontWeight: "bold", color: "#2D3748" },
  valueDescription: { fontSize: 16, color: "#4A5568", lineHeight: 24 },
  valueStatus: { fontSize: 20, fontWeight: "bold" },
  valueDate: { fontSize: 16, fontStyle: "italic", color: "#718096" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
