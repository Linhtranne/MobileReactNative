import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { CartContext } from './cart-context';

export default function CartScreen() {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Giỏ hàng</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>Giỏ hàng trống.</Text>}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 8 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
              <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
              <Button title="Xóa" onPress={() => removeFromCart(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}
