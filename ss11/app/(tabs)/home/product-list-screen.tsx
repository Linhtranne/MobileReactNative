import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from './product-card';
import { PRODUCTS } from './product-data';

export default function ProductListScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}
