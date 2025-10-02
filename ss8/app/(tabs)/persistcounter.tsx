import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'counterValue';

const PersistCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          setCount(Number(value));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, count.toString());
    }
  }, [count, loading]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Giá trị bộ đếm:</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonRow}>
        <Button title="Tăng(+)" onPress={() => setCount(c => c + 1)} />
        <View style={{ width: 16 }} />
        <Button title="Giảm(-)" onPress={() => setCount(c => c - 1)} />
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
    padding: 16,
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

export default PersistCounter;
