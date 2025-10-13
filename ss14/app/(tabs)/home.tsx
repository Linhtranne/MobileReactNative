import React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Trang chủ</Text>
      <Text>Chào mừng bạn đến với ứng dụng quản lý vị trí công việc!</Text>
    </View>
  );
}
