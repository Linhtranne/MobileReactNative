import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import TodoItem from '../../components/TodoItem';

const TodoApp: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      setNotes([input.trim(), ...notes]);
      setInput('');
    }
  };

  const handleDelete = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ghi chú</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập ghi chú mới"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <TodoItem note={item} onDelete={() => handleDelete(index)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có ghi chú nào</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});

export default TodoApp;
