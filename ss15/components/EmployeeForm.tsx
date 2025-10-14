import baseUrl from "@/apis/baseURL";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Employee, Gender, Position } from "../data/mockData";
import { styles } from "../styles/employee-form.styles";

interface EmployeeFormProps {
  initialData?: Employee;
  onSubmit?: (data: any) => void;
}

export default function EmployeeForm({
  initialData,
  onSubmit,
}: EmployeeFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<{
    employeeCode: string;
    employeeName: string;
    phoneNumber: string;
    gender: Gender;
    positionId?: number;
  }>({
    employeeCode: initialData?.employeeCode || "",
    employeeName: initialData?.employeeName || "",
    phoneNumber: initialData?.phoneNumber || "",
    gender: initialData?.gender || Gender.MALE,
    positionId: initialData?.positionId || undefined,
  });

  const [date, setDate] = useState(
    initialData?.dateBirth ? new Date(initialData.dateBirth) : new Date()
  );
  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeCode: initialData.employeeCode || "",
        employeeName: initialData.employeeName || "",
        phoneNumber: initialData.phoneNumber || "",
        gender: initialData.gender || Gender.MALE,
        positionId: initialData.positionId || undefined,
      });
      setDate(
        initialData.dateBirth ? new Date(initialData.dateBirth) : new Date()
      );
    }
  }, [initialData]);

  useEffect(() => {
    const getAllPositions = async () => {
      const response = await baseUrl.get("/positions");
      setPositions(response.data.data);
    };
    getAllPositions();
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const payload = {
      ...formData,
      dateBirth: date.toISOString().split("T")[0],
    };

    try {
      if (initialData && initialData.id) {
        const updatePayload = {
          employeeName: formData.employeeName,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          positionId: formData.positionId,
          dateBirth: date.toISOString().split("T")[0],
        };
        await baseUrl.put(`/employees/${initialData.id}`, updatePayload);
        Alert.alert("Success", "Employee updated successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        await baseUrl.post("/employees", payload);
        Alert.alert("Success", "Employee created successfully!", [
          { text: "OK", onPress: () => router.replace("/employees") },
        ]);
      }
      onSubmit?.(payload);
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Employee Code *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeCode}
        onChangeText={(v) => handleInputChange("employeeCode", v)}
        placeholder="e.g., EMP0004"
      />

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        value={formData.employeeName}
        onChangeText={(v) => handleInputChange("employeeName", v)}
        placeholder="e.g., John Doe"
      />

      <Text style={styles.label}>Phone Number *</Text>
      <TextInput
        style={styles.input}
        value={formData.phoneNumber}
        onChangeText={(v) => handleInputChange("phoneNumber", v)}
        placeholder="e.g., 09xxxxxxx"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(v) => handleInputChange("gender", v)}
        >
          <Picker.Item label="Male" value={Gender.MALE} />
          <Picker.Item label="Female" value={Gender.FEMALE} />
        </Picker>
      </View>

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString("en-US")}
          editable={false}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={"date"}
          display={"spinner"}
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Position</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.positionId}
          onValueChange={(v) => handleInputChange("positionId", v)}
        >
          <Picker.Item label="-- Select position --" value={undefined} />
          {positions.map((pos) => (
            <Picker.Item key={pos.id} label={pos.positionName} value={pos.id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        {isSubmitting ? (
          <ActivityIndicator size="large" />
        ) : (
          <Button
            title={initialData ? "Save changes" : "Create"}
            onPress={handleSubmit}
            disabled={isSubmitting}
            color="tomato"
          />
        )}
      </View>
    </ScrollView>
  );
}
