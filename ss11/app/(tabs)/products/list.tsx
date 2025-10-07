import React, { useEffect, useState } from 'react';
import { View, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './product-card';

export default function ProductListScreen() {
  const navigation = useNavigation<any>();
  const [products, setProducts] = useState<any[]>([]);

  const loadProducts = async () => {
    const stored = await AsyncStorage.getItem('PRODUCTS');
    setProducts(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id: string) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa', style: 'destructive', onPress: async () => {
          const arr = products.filter(p => p.id !== id);
          await AsyncStorage.setItem('PRODUCTS', JSON.stringify(arr));
          setProducts(arr);
        }
      }
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Thêm sản phẩm" onPress={() => navigation.navigate('ProductForm', { mode: 'add' })} />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
            onEdit={() => navigation.navigate('ProductForm', { mode: 'edit', product: item })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        style={{ marginTop: 12 }}
        ListEmptyComponent={<View style={{ alignItems: 'center', marginTop: 32 }}><Button title="Thêm sản phẩm đầu tiên" onPress={() => navigation.navigate('ProductForm', { mode: 'add' })} /></View>}
      />
    </View>
  );
}
