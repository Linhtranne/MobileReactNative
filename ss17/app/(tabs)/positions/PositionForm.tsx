import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function PositionForm({ onSubmit, isLoading, initialValues }: {
  onSubmit: (data: { positionName: string }) => void;
  isLoading?: boolean;
  initialValues?: { positionName?: string };
}) {
  const [positionName, setPositionName] = useState(initialValues?.positionName || "");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên vị trí"
        value={positionName}
        onChangeText={setPositionName}
      />
      <Button
        title={isLoading ? "Đang thêm..." : "Thêm vị trí"}
        onPress={() => onSubmit({ positionName })}
        disabled={isLoading || !positionName.trim()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});
