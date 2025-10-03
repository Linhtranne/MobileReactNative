import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Props {
  contact: Contact;
  onPress: () => void;
  onDelete: () => void;
}

const ContactListItem: React.FC<Props> = ({ contact, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.phone}>{contact.phone}</Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  phone: {
    fontSize: 15,
    color: '#555',
    marginTop: 2,
  },
  deleteBtn: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: '#d32f2f',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactListItem;
