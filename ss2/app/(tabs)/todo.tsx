import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet } from 'react-native';

const hardcodedTasks = [
  'Học React Native Styling',
  'Làm bài tập về Scroll View',
  'Tìm hiểu về component Pressable',
  'Chuẩn bị cho dự án cuối kì',
  'Đọc sách chuyên ngành 30 phút',
];

export default function TodoScreen() {
  const [input, setInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập công việc..."
          value={input}
          onChangeText={setInput}
        />
        <Pressable style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {hardcodedTasks.map((task, idx) => (
          <View key={idx} style={[styles.taskItem, { backgroundColor: idx % 2 === 0 ? '#E0F7FA' : '#FFECB3' }]}> 
            <Text style={styles.taskText}>{task}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    marginLeft: 12,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  taskItem: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  taskText: {
    fontSize: 17,
    color: '#333',
  },
});
