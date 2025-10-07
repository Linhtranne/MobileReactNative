import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './cart-context';
import { Ionicons } from '@expo/vector-icons';

export default function CartHeaderIcon() {
  const navigation = useNavigation<any>();
  const { cartItems } = useContext(CartContext) as { cartItems: any[] };
  const total = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 16 }}>
      <View>
        <Ionicons name="cart-outline" size={28} color="#007AFF" />
        {total > 0 && (
          <View style={{
            position: 'absolute',
            right: -6,
            top: -6,
            backgroundColor: 'red',
            borderRadius: 8,
            minWidth: 16,
            height: 16,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 3,
          }}>
            <Text style={{ color: 'white', fontSize: 11, fontWeight: 'bold' }}>{total}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
