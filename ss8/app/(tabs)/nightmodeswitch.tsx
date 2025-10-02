import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'nightMode';

const NightModeSwitch: React.FC = () => {
  const [isNight, setIsNight] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          setIsNight(JSON.parse(value));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = async (value: boolean) => {
    setIsNight(value);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isNight && styles.nightBg]}>
      <Text style={[styles.label, isNight && styles.nightText]}>Chế độ ban đêm</Text>
      <Switch
        value={isNight}
        onValueChange={handleToggle}
        thumbColor={isNight ? '#fff' : '#007AFF'}
        trackColor={{ false: '#ccc', true: '#333' }}
      />
      <Text style={[styles.status, isNight && styles.nightText]}>
        {isNight ? 'Đang bật chế độ ban đêm' : 'Đang tắt chế độ ban đêm'}
      </Text>
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
  nightBg: {
    backgroundColor: '#222',
  },
  label: {
    fontSize: 20,
    marginBottom: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  nightText: {
    color: '#fff',
  },
  status: {
    marginTop: 16,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default NightModeSwitch;
