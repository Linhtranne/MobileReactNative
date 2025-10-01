import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giá trị hiện tại:</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Tăng(+)" onPress={() => setCount(count + 1)} />
        <View style={{ width: 16 }} />
        <Button title="Giảm(-)" onPress={() => setCount(count - 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  count: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Counter;
