import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 24 }}>Chào mừng đến với Shop!</Text>
      <Button title="Xem sản phẩm" onPress={() => navigation.navigate('ProductList')} />
    </View>
  );
}
