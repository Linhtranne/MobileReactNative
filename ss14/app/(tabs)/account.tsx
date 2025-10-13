import React from 'react';
import { View, Text } from 'react-native';

export default function AccountScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Tài khoản</Text>
      <Text>Thông tin tài khoản của bạn sẽ hiển thị ở đây.</Text>
    </View>
  );
}
