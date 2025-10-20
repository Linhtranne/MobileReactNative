export default function PositionListScreen() {
  const router = useRouter();
  const mutation = useDeletePosition();
  const { data, isLoading, isError } = usePositionsList();

  if (isLoading) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }

  if (isError) {
    return (
      import React from "react";
      import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
      import { usePositionsList, useDeletePosition } from "../../../hooks/usePositionsQuery";
      import { useRouter } from "expo-router";
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không thể tải dữ liệu. Vui lòng thử lại.</Text>
      </View>
    );
  }

  const positions = data?.data || [];

  if (!positions.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Chưa có vị trí nào.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={positions}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => router.push(`/positions/${item.id}`)}
            >
              <Text style={styles.itemName}>{item.positionName}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Alert.alert(
                  'Xóa vị trí',
                  'Bạn có chắc chắn muốn xóa vị trí này?',
                  [
                    { text: 'Hủy', style: 'cancel' },
                    { text: 'Xóa', style: 'destructive', onPress: () => mutation.mutate(item.id) },
                  ]
                );
              }}
              disabled={mutation.isPending}
            >
              <Text style={{ color: '#E53E3E', fontWeight: 'bold' }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
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
    gap: 8,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FFF0F0',
    alignSelf: 'center',
  },
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  emptyText: { textAlign: "center", fontSize: 16, color: "#888" },
  errorText: { textAlign: "center", fontSize: 16, color: "#E53E3E" },
});
