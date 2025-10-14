// app/position/index.tsx (PositionList)
import { getData, deletePosition } from "@/api/position.api";
import Position from "@/components/Position";
import { PositionType } from "@/interface/PositionType";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function PositionList() {
  const [positions, setPositions] = useState<any[]>([]);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const res = await getData();
      setPositions(res?.data ?? []);
    } catch {
      setPositions([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleView = (id: number) => {
    router.push({
      pathname: "/position/detail-position",
      params: { id: String(id) },
    });
  };

  const handleEdit = (item: PositionType) => {
    router.push({
      pathname: "/position/edit-position",
      params: { id: String(item.id) },
    });
  };

  const handleDelete = (id: number) => {
    Alert.alert("Xoá vị trí", "Bạn chắc muốn xoá vị trí này chứ?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Xoá",
        style: "destructive",
        onPress: async () => {
          try {
            await deletePosition(id);
            await fetchData();
          } catch (e) {
            Alert.alert("Lỗi", "Xoá không thành công. Thử lại nhé.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={positions}
        renderItem={({ item }) => (
          <Position
            position={item}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 40,
            }}
          >
            <Text style={{ fontSize: 16, color: "#666" }}>
              Chưa có vị trí nào.
            </Text>
          </View>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexGrow: positions.length === 0 ? 1 : 0,
        }}
      />
    </SafeAreaView>
  );
}
