import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userName';

const WelcomeStorage: React.FC = () => {
  const [name, setName] = useState('');
  const [savedName, setSavedName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        setSavedName(value);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, name);
    setSavedName(name);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {savedName ? (
        <>
          <Text style={styles.welcome}>Chào mừng trở lại, {savedName}!</Text>
          <Button
            title="Quên tôi"
            color="#d32f2f"
            onPress={async () => {
              await AsyncStorage.removeItem(STORAGE_KEY);
              setSavedName(null);
            }}
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Nhập tên của bạn:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên..."
          />
          <Button title="Lưu" onPress={handleSave} disabled={!name.trim()} />
        </>
      )}
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    width: 240,
    marginBottom: 12,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default WelcomeStorage;
