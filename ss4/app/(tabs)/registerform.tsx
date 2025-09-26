import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const validateEmail = (email: string) => {
  return /^\S+@\S+\.\S+$/.test(email);
};

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateField = (field: keyof typeof form, value: string) => {
    let error = '';
    if (field === 'name' && !value.trim()) {
      error = 'Tên không được để trống.';
    }
    if (field === 'email') {
      if (!value.trim()) error = 'Email không được để trống.';
      else if (!validateEmail(value)) error = 'Email không đúng định dạng.';
    }
    if (field === 'password') {
      if (!value) error = 'Mật khẩu không được để trống.';
      else if (value.length < 6) error = 'Mật khẩu phải từ 6 ký tự.';
    }
    if (field === 'confirmPassword') {
      if (!value) error = 'Vui lòng xác nhận mật khẩu.';
      else if (value !== form.password) error = 'Mật khẩu không khớp.';
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof typeof form) => {
    validateField(field, form[field]);
  };

  const isFormValid =
    form.name.trim() &&
    validateEmail(form.email) &&
    form.password.length >= 6 &&
    form.password === form.confirmPassword &&
    !Object.values(errors).some(e => e);

  const handleRegister = () => {
    // Xử lý đăng ký, ví dụ gửi dữ liệu lên server
    alert('Đăng ký thành công!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký người dùng</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={form.name}
        onChangeText={v => handleChange('name', v)}
        onBlur={() => handleBlur('name')}
      />
      {!!errors.name && <Text style={styles.error}>{errors.name}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={v => handleChange('email', v)}
        onBlur={() => handleBlur('email')}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!!errors.email && <Text style={styles.error}>{errors.email}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={form.password}
        onChangeText={v => handleChange('password', v)}
        onBlur={() => handleBlur('password')}
        secureTextEntry
      />
      {!!errors.password && <Text style={styles.error}>{errors.password}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        value={form.confirmPassword}
        onChangeText={v => handleChange('confirmPassword', v)}
        onBlur={() => handleBlur('confirmPassword')}
        secureTextEntry
      />
      {!!errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
      <TouchableOpacity
        style={[styles.button, !isFormValid && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!isFormValid}
      >
        <Text style={styles.buttonText}>Đăng ký</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 350,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: '#E53935',
    marginBottom: 8,
    alignSelf: 'flex-start',
    maxWidth: 350,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterForm;
