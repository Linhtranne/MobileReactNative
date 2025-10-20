import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import PositionForm from "./PositionForm";
import { createPosition } from "../../../api/positions";

export default function AddPositionScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPosition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] });
      Alert.alert("Thành công", "Đã thêm vị trí mới.");
      router.back();
    },
    onError: () => {
      Alert.alert("Lỗi", "Không thể thêm vị trí. Vui lòng thử lại.");
    },
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
  <PositionForm onSubmit={mutation.mutate} isLoading={mutation.isPending} />
    </View>
  );
}

// styles removed (không dùng)
