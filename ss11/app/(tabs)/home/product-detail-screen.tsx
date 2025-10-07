import React, { useContext } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { CartContext } from './cart-context';
import { PRODUCTS } from './product-data';

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params || {};
  type Product = {
      image: string | undefined; id: string; name: string; description: string; price: number 
};
  const product = (PRODUCTS as Product[]).find((p: Product) => p.id === id);
  const { addToCart } = useContext(CartContext) as { addToCart: (product: Product) => void };

  if (!product) return <Text>Không tìm thấy sản phẩm.</Text>;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Image source={{ uri: product.image }} style={{ width: 600, height: 300, borderRadius: 8, marginRight: 16 }} />
      <Text style={{ fontSize: 24, marginBottom: 12 }}>{product.name}</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>{product.description}</Text>
      <Text style={{ fontSize: 18, marginBottom: 24, color: '#007AFF' }}>{product.price}₫</Text>
      <Button title="Thêm vào giỏ hàng" onPress={() => addToCart(product)} />
    </View>
  );
}

