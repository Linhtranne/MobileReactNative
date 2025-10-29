import { Link } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

function Item({ href, title, desc }: any) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <Text>{desc}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>Danh sách bài tập Notifications</Text>
      <Item
        href="/exercises/Ex01"
        title="Ex01"
        desc="Xin quyền + Gửi ngay (trigger null)"
      />
      <Item
        href="/exercises/Ex02"
        title="Ex02"
        desc="Local Notification đơn giản"
      />
      <Item
        href="/exercises/Ex03_05"
        title="Ex03 + Ex05"
        desc="Hẹn sau 10s + đọc data khi tap"
      />
      <Item
        href="/exercises/Ex04"
        title="Ex04"
        desc="Lấy Expo Push Token & hiển thị"
      />
      <Item
        href="/exercises/Ex06"
        title="Ex06"
        desc="Android Channels (reminders, news)"
      />
      <Item
        href="/exercises/Ex07"
        title="Ex07"
        desc="Tap notification → điều hướng Details"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  h1: { fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  box: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: { fontWeight: "600", marginBottom: 4 },
});
