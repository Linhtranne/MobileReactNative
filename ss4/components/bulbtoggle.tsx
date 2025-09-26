import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BulbToggleScreen: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={isOn ? 'lightbulb-on' : 'lightbulb-off'}
        size={100}
        color={isOn ? '#FFD600' : '#BDBDBD'}
        style={styles.icon}
      />
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        <Text style={styles.buttonText}>Bật/Tắt</Text>
      </TouchableOpacity>
      <Text style={styles.status}>{isOn ? 'Bóng đèn đang sáng' : 'Bóng đèn đang tắt'}</Text>
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
  icon: {
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: '#333',
  },
});

export default BulbToggleScreen;
