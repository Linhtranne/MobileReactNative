import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactListItem from '../components/ContactListItem';
import ContactForm from '../components/ContactForm';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const STORAGE_KEY = 'contacts';

const PhoneBook: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value) setContacts(JSON.parse(value));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts, loading]);

  const handleAdd = () => {
    setEditingContact(null);
    setModalVisible(true);
  };

  const handleSave = (data: Omit<Contact, 'id'>, id?: string) => {
    if (id) {
      setContacts(prev => prev.map(c => (c.id === id ? { ...c, ...data } : c)));
    } else {
      setContacts(prev => [
        ...prev,
        { id: Date.now().toString(), ...data },
      ]);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa liên hệ này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa', style: 'destructive',
        onPress: () => setContacts(prev => prev.filter(c => c.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh bạ điện thoại</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactListItem
            contact={item}
            onPress={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có liên hệ nào</Text>}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addBtnText}>+ Thêm mới</Text>
      </TouchableOpacity>
      <ContactForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        editingContact={editingContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginVertical: 18,
  },
  addBtn: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    margin: 24,
    elevation: 2,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});

export default PhoneBook;
