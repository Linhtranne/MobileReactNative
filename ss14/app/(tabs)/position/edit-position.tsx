// app/position/edit-position.tsx
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getPositionById,
  updatePosition,
  PositionStatus,
} from "@/api/position.api";

export default function EditPositionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [positionName, setPositionName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<PositionStatus | "">("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;
        const data = await getPositionById(Number(id));
        setPositionName(data?.positionName ?? "");
        setDescription(data?.description ?? "");
        setStatus((data?.positionStatus as PositionStatus) ?? "");
      } catch (e) {
        Alert.alert("Lỗi", "Không tải được thông tin vị trí." + e);
      }
    };
    fetchDetail();
  }, [id]);

  const isValid = positionName.trim().length > 0 && !!status;

  const handleSubmit = async () => {
    if (!isValid) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên vị trí và trạng thái.");
      return;
    }
    try {
      await updatePosition(Number(id), {
        positionName: positionName.trim(),
        description: description.trim() || undefined,
        positionStatus: status as PositionStatus,
      });

      Alert.alert("Thành công", "Đã cập nhật vị trí.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e) {
      Alert.alert("Lỗi", "Không thể cập nhật vị trí. Vui lòng thử lại.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên vị trí</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên vị trí"
            placeholderTextColor="#9aa0a6"
            value={positionName}
            onChangeText={setPositionName}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Mô tả</Text>
          <TextInput
            style={[styles.input, { height: 96, textAlignVertical: "top" }]}
            placeholder="Nhập mô tả"
            placeholderTextColor="#9aa0a6"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Trạng thái</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(v) => setStatus(v as PositionStatus | "")}
              style={styles.picker}
              itemStyle={{ fontSize: 16 }}
            >
              <Picker.Item label="Chọn trạng thái" value="" />
              <Picker.Item label="Đang hoạt động" value="ACTIVE" />
              <Picker.Item label="Ngừng hoạt động" value="INACTIVE" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.btnSubmit, !isValid && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.btnText}>LƯU THAY ĐỔI</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "white",
  },
  pickerContainer: {
    borderWidth: 2,
    borderColor: "#e3e3e3",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "white",
  },
  picker: {
    height: 48,
  },
  btnSubmit: {
    marginTop: 8,
    backgroundColor: "#2296F3",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 12,
  },
  btnText: { color: "white", fontSize: 14, fontWeight: "600" },
});
