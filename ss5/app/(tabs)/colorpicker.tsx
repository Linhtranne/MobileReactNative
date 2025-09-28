import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const clamp = (val: number) => Math.max(0, Math.min(255, val));

const ColorPicker: React.FC = () => {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);

  const color = `rgb(${red},${green},${blue})`;

  return (
    <View style={styles.container}>
      <View style={[styles.preview, { backgroundColor: color }]} />
      <View style={styles.row}>
        <Text style={[styles.label, { color: 'red' }]}>Red: {red}</Text>
        <Button title="-" onPress={() => setRed(clamp(red - 1))} />
        <Button title="+" onPress={() => setRed(clamp(red + 1))} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: 'green' }]}>Green: {green}</Text>
        <Button title="-" onPress={() => setGreen(clamp(green - 1))} />
        <Button title="+" onPress={() => setGreen(clamp(green + 1))} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: 'blue' }]}>Blue: {blue}</Text>
        <Button title="-" onPress={() => setBlue(clamp(blue - 1))} />
        <Button title="+" onPress={() => setBlue(clamp(blue + 1))} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    maxWidth: 350,
    height: 120,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 110,
  },
});

export default ColorPicker;
