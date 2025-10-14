import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getPositionById } from "@/api/position.api";
import { PositionType } from "@/interface/PositionType";

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<PositionType | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      try {
        const res = await getPositionById(Number(id));
        setData(res);
      } catch (e) {}
    };
    load();
  }, [id]);

  const statusChipStyle =
    data?.positionStatus === "ACTIVE"
      ? [styles.chip, { backgroundColor: "green" }]
      : [styles.chip, { backgroundColor: "#aaa" }];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrap}>
        <Text style={styles.label}>
          Tên vị trí:{" "}
          <Text style={styles.value}>{data?.positionName ?? "-"}</Text>
        </Text>

        <View style={{ marginTop: 8 }}>
          <Text style={styles.label}>Trạng thái:</Text>
          <View style={statusChipStyle}>
            <Text style={styles.chipText}>
              {data?.positionStatus === "ACTIVE"
                ? "Đang hoạt động"
                : "Ngừng hoạt động"}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.label}>Mô tả:</Text>
          <Text style={[styles.value, { marginTop: 4 }]}>
            {data?.description?.trim() ? data.description : "—"}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 16, paddingTop: 12 },
  label: { fontSize: 16, fontWeight: "600" },
  value: { fontSize: 16, fontWeight: "400" },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  chipText: { color: "white", fontSize: 14, fontWeight: "600" },
});
