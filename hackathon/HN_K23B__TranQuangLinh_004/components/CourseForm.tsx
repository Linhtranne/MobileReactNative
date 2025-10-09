import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Course,  CourseStatuses } from "../types";

type FormData = Omit<Course, "id">;

interface ProductFormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
  submitButtonText?: string;
}

export default function ProductForm({
  onSubmit,
  initialValues = { name: "", price: 0, status: "Đang hoạt động" },
  submitButtonText = "Lưu",
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: initialValues,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên khóa học</Text>
      <Controller
        control={control}
        rules={{ required: "Tên khóa học không được để trống" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ví dụ: Lâp trình React Native"
            autoCapitalize="words"
          />
        )}
        name="name"
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Text style={styles.label}>Giá tiền (VNĐ)</Text>
      <Controller
        control={control}
        rules={{
          required: "Giá tiền không được để trống",
          min: { value: 0, message: "Giá tiền không thể âm" },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(text) => onChange(parseInt(text, 10) || 0)}
            value={String(value)}
            placeholder="Nhập giá tiền"
            keyboardType="number-pad"
          />
        )}
        name="price"
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      <Text style={styles.label}>Trạng thái</Text>
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerContainer}>
            <Picker selectedValue={value} onValueChange={onChange}>
              {CourseStatuses.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
              ))}
            </Picker>
          </View>
        )}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={submitButtonText}
          onPress={handleSubmit(onSubmit)}
          color="#4800ffff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 15, fontWeight: "500" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  error: { color: "red", marginTop: 5 },
  buttonContainer: { marginTop: 30 },
});