import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import CourseForm from "../../../components/CourseForm";
import { useCourses } from "../../../hooks/useCourses";
import { Course } from "../../../types";
export default function EditCourseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCourseById, updateCourse, loading } = useCourses();

  const course = getCourseById(id);

  const handleUpdateCourse = async (data: Omit<Course, "id">) => {
    if (course) {
      await updateCourse({ ...course, ...data });
      if (router.canGoBack()) {
        router.back();
      }
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (!course)
    return <Text style={styles.errorText}>Không tìm thấy sản phẩm.</Text>;

  return (
    <ScrollView style={styles.container}>
      <CourseForm
        onSubmit={handleUpdateCourse}
        initialValues={course}
        submitButtonText="Cập nhật"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  errorText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "red" },
});
