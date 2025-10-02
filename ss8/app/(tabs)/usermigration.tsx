import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userProfile';

// Version 2 structure
interface UserProfileV2 {
  user: {
    firstName: string;
    lastName: string;
  };
  version: 2;
}

const migrateV1toV2 = async (oldData: { name: string }) => {
  const [firstName, ...rest] = oldData.name.split(' ');
  const lastName = rest.join(' ');
  const newData: UserProfileV2 = {
    user: { firstName, lastName },
    version: 2,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

const UserMigration: React.FC = () => {
  const [profile, setProfile] = useState<UserProfileV2 | null>(null);
  const [loading, setLoading] = useState(true);
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    const checkAndMigrate = async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          const data = JSON.parse(raw);
          if (data.version === 2 && data.user) {
            setProfile(data);
            setLoading(false);
            return;
          }
          // Nếu là v1: { name: 'John Doe' }
          if (typeof data.name === 'string') {
            await migrateV1toV2(data);
            setMigrated(true);
            const newRaw = await AsyncStorage.getItem(STORAGE_KEY);
            setProfile(newRaw ? JSON.parse(newRaw) : null);
            setLoading(false);
            return;
          }
        } catch {
          // corrupted or unknown format
        }
      }
      setLoading(false);
    };
    checkAndMigrate();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang kiểm tra dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {profile ? (
        <>
          <Text style={styles.title}>Thông tin người dùng (v2)</Text>
          <Text style={styles.info}>Họ: {profile.user.lastName}</Text>
          <Text style={styles.info}>Tên: {profile.user.firstName}</Text>
          {migrated && <Text style={styles.migrated}>Đã tự động chuyển đổi dữ liệu từ phiên bản cũ!</Text>}
        </>
      ) : (
        <Text style={styles.info}>Chưa có dữ liệu người dùng.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007AFF',
  },
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  migrated: {
    color: '#388e3c',
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default UserMigration;
