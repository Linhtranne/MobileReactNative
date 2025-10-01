import React, { useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FocusInput: React.FC = () => {
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ô nhập liệu:</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder="Nhập gì đó..."
      />
      <View style={{ height: 16 }} />
      <Button title="Focus vào ô nhập liệu" onPress={handleFocus} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default FocusInput;
