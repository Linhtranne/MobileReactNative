import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';


type ButtonType = 'primary' | 'secondary' | 'danger' | 'disabled';
interface ButtonStyle {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}
const BUTTON_TYPES: Record<ButtonType, ButtonStyle> = {
  primary: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    textColor: '#fff',
  },
  secondary: {
    backgroundColor: '#fff',
    borderColor: '#007AFF',
    textColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
    textColor: '#fff',
  },
  disabled: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
    textColor: '#888',
  },
};

interface CustomButtonProps {
  title: string;
  type?: ButtonType;
  disabled?: boolean;
  onPress?: () => void;
}
function CustomButton({ title, type = 'primary', disabled = false, onPress }: CustomButtonProps) {
  const style = BUTTON_TYPES[type];
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: style.textColor }]}>{title}</Text>
    </Pressable>
  );
}

export default function ButtonShowcaseScreen() {
  return (
    <View style={styles.container}>
      <CustomButton title="Button Primary" type="primary" onPress={() => {}} />
      <CustomButton title="Button Secondary" type="secondary" onPress={() => {}} />
      <CustomButton title="Button Danger" type="danger" onPress={() => {}} />
      <CustomButton title="Button Disabled" type="disabled" disabled onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  button: {
    width: 220,
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
