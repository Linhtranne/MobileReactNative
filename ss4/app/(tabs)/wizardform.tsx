import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const WizardForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else alert('Đã hoàn tất!');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form Khảo Sát ({step}/3)</Text>
      {step === 1 && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Tên"
            value={form.name}
            onChangeText={v => handleChange('name', v)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tuổi"
            value={form.age}
            onChangeText={v => handleChange('age', v)}
            keyboardType="numeric"
          />
        </View>
      )}
      {step === 2 && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={form.phone}
            onChangeText={v => handleChange('phone', v)}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ"
            value={form.address}
            onChangeText={v => handleChange('address', v)}
          />
        </View>
      )}
      {step === 3 && (
        <View style={styles.reviewBox}>
          <Text style={styles.reviewTitle}>Xem lại thông tin:</Text>
          <Text>Tên: {form.name}</Text>
          <Text>Tuổi: {form.age}</Text>
          <Text>Số điện thoại: {form.phone}</Text>
          <Text>Địa chỉ: {form.address}</Text>
        </View>
      )}
      <View style={styles.buttonRow}>
        {step > 1 && (
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{step === 3 ? 'Hoàn tất' : 'Tiếp theo'}</Text>
        </TouchableOpacity>
      </View>
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
    width: 320,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  button: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: 320,
  },
  reviewTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
});

export default WizardForm;
