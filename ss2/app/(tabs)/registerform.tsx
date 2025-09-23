import React from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

export default function RegisterFormScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.inputError]}
          placeholder="Nhập email..."
          value=""
        />
        <Text style={styles.errorText}>Vui lòng nhập một địa chỉ email hợp lệ.</Text>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={[styles.input, styles.inputSuccess]}
          placeholder="Nhập mật khẩu..."
          value=""
          secureTextEntry
        />
      </View>
      <Pressable style={[styles.button, styles.buttonDisabled]} disabled>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  formGroup: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 28,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: '#FF3B30',
    marginBottom: 6,
  },
  inputSuccess: {
    borderColor: '#34C759',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 15,
    marginBottom: 2,
  },
  button: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});
