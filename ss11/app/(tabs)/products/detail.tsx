import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function ProductDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params || {};
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('PRODUCTS');
      const arr = stored ? JSON.parse(stored) : [];
      setProduct(arr.find((p: any) => p.id === id));
    })();
  }, [id]);

  if (!product) return <Text>Không tìm thấy sản phẩm.</Text>;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      {product.image && <Image source={{ uri: product.image }} style={{ width: 120, height: 120, borderRadius: 12, marginBottom: 16 }} />}
      <Text style={{ fontSize: 24, marginBottom: 12 }}>{product.name}</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>{product.description}</Text>
      <Text style={{ fontSize: 18, marginBottom: 8, color: '#007AFF' }}>{product.price}₫</Text>
      <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Trạng thái: {product.status}</Text>
    </View>
  );
}
