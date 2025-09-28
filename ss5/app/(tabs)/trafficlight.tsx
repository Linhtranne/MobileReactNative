import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const COLORS = {
  red: '#E53935',
  yellow: '#FFD600',
  green: '#43A047',
};

const ORDER: ('green' | 'yellow' | 'red')[] = ['green', 'yellow', 'red'];

const TrafficLight: React.FC = () => {
  const [current, setCurrent] = useState<'green' | 'yellow' | 'red'>('green');

  const handleNext = () => {
    const idx = ORDER.indexOf(current);
    setCurrent(ORDER[(idx + 1) % ORDER.length]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.lightsBox}>
        <View
          style={[styles.light, { backgroundColor: COLORS.red, opacity: current === 'red' ? 1 : 0.3 }]} />
        <View
          style={[styles.light, { backgroundColor: COLORS.yellow, opacity: current === 'yellow' ? 1 : 0.3 }]} />
        <View
          style={[styles.light, { backgroundColor: COLORS.green, opacity: current === 'green' ? 1 : 0.3 }]} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Chuyển Đèn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  lightsBox: {
    alignItems: 'center',
    marginBottom: 32,
  },
  light: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 12,
    borderWidth: 3,
    borderColor: '#333',
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TrafficLight;
