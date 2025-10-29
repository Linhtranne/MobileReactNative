import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ExercisesIndex() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Danh sách bài tập</Text>

      <Link href="/exercises/Ex01_to_Ex05" asChild>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseTitle}>
            Bài 1-5: Camera và Upload ảnh
          </Text>
          <Text style={styles.exerciseDescription}>
            Chụp ảnh với camera, xem trước, và upload lên Cloudinary
          </Text>
        </TouchableOpacity>
      </Link>

      <Link href="/exercises/Ex06_07" asChild>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseTitle}>
            Bài 6-7: Quay video + Lật cam + Flash + Nén ảnh
          </Text>
          <Text style={styles.exerciseDescription}>
            Quay/Dừng video, preview video, đảo camera, flash on/off/auto, và
            nén ảnh trước khi upload lên Cloudinary
          </Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  exerciseButton: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: "#666",
  },
});
