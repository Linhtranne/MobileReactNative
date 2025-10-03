import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, 'id'>, id?: string) => void;
  editingContact?: Contact | null;
}

const ContactForm: React.FC<Props> = ({ visible, onClose, onSave, editingContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setPhone(editingContact.phone);
      setEmail(editingContact.email);
    } else {
      setName('');
      setPhone('');
      setEmail('');
    }
  }, [editingContact, visible]);

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) return;
    onSave({ name: name.trim(), phone: phone.trim(), email: email.trim() }, editingContact?.id);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.form}>
          <Text style={styles.title}>{editingContact ? 'Sửa liên hệ' : 'Thêm liên hệ mới'}</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Tên liên hệ"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email (không bắt buộc)"
            keyboardType="email-address"
          />
          <View style={styles.buttonRow}>
            <Button title="Hủy" onPress={onClose} color="#888" />
            <View style={{ width: 16 }} />
            <Button title="Lưu" onPress={handleSave} disabled={!name.trim() || !phone.trim()} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 320,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
});

export default ContactForm;
