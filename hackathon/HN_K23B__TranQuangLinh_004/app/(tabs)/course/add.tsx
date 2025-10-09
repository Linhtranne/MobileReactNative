import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import ProductForm from "../../../components/CourseForm";
import { useCourses } from "../../../hooks/useCourses";
import { Course } from "../../../types";

export default function AddCourseScreen() {
  const router = useRouter();
  const { addCourse } = useCourses();
  const [error, setError] = React.useState<string | null>(null);

  const handleAddCourse = async (data: Omit<Course, "id">) => {
    try {
      await addCourse(data);
      setError(null);
      if (router.canGoBack()) {
        router.back();
      }
    } catch (e: any) {
      setError(e.message || "Có lỗi xảy ra");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {error && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 16 }}>{error}</Text>
      )}
      <ProductForm
        onSubmit={handleAddCourse}
        submitButtonText="Thêm khóa học"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
});