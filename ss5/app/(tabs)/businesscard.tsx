
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface BusinessCardProps {
  avatarUrl: string;
  name: string;
  jobTitle: string;
  contactInfo: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ avatarUrl, name, jobTitle, contactInfo }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{jobTitle}</Text>
      <Text style={styles.contact}>{contactInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1976d2',
    padding: 24,
    margin: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#1976d2',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  contact: {
    fontSize: 15,
    color: '#555',
  },
});

export default BusinessCard;
