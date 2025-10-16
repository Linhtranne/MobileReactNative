import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchPositions } from "../../../api/positions";

export default function PositionListScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['positions'],
    queryFn: fetchPositions,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (isError) {
    return <View style={styles.container}><Text>Đã xảy ra lỗi khi tải dữ liệu.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.data || []}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.positionName}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có vị trí nào.</Text>}
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
  itemName: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  actions: { flexDirection: "row", alignItems: "center" },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 16 },
});
