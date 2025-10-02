import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userSettings';

interface Settings {
  username: string;
  email: string;
  notificationsEnabled: boolean;
}

const defaultSettings: Settings = {
  username: 'Guest',
  email: '',
  notificationsEnabled: true,
};

const SettingsPersist: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value) {
          setSettings({ ...defaultSettings, ...JSON.parse(value) });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, loading]);

  const handleChange = (key: keyof Settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
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
      <Text style={styles.title}>Cài đặt người dùng</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Tên hiển thị:</Text>
        <TextInput
          style={styles.input}
          value={settings.username}
          onChangeText={v => handleChange('username', v)}
          placeholder="Tên hiển thị"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={settings.email}
          onChangeText={v => handleChange('email', v)}
          placeholder="Email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo:</Text>
        <Switch
          value={settings.notificationsEnabled}
          onValueChange={v => handleChange('notificationsEnabled', v)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#007AFF',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 120,
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});

export default SettingsPersist;
