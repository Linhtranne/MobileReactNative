import React from "react";
import { View, Text, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useLocalSearchParams } from "expo-router";
import PositionForm from "./PositionForm";
import { getPositionById, updatePosition } from "../../../api/positions";

export default function EditPositionScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const positionId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const { data, isLoading, isError } = useQuery({
    queryKey: ["position", positionId],
    queryFn: () => getPositionById(positionId),
    enabled: !!positionId,
  });

  const mutation = useMutation({
    mutationFn: (values: { positionName: string }) => updatePosition(positionId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      Alert.alert("Thành công", "Đã cập nhật vị trí.");
      router.back();
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể cập nhật vị trí. Vui lòng thử lại.");
    },
  });

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Đang tải dữ liệu...</Text></View>;
  }
  if (isError || !data) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Không thể tải dữ liệu vị trí.</Text></View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <PositionForm
        onSubmit={mutation.mutate}
        isLoading={mutation.isPending}
        initialValues={{ positionName: data.data?.positionName || "" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
