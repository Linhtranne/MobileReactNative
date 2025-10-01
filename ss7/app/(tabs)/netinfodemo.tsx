import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

const NetInfoDemo: React.FC = () => {
  const netInfo = useNetInfo();

  return (
    <View style={styles.container}>
      {!netInfo.isConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Mất kết nối mạng!</Text>
        </View>
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Trạng thái kết nối:</Text>
        <Text style={styles.value}>{netInfo.isConnected ? 'Đã kết nối' : 'Không kết nối'}</Text>
        <Text style={styles.label}>Loại kết nối:</Text>
        <Text style={styles.value}>{netInfo.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    backgroundColor: '#d32f2f',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
});

export default NetInfoDemo;
