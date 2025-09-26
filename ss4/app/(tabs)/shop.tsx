import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ProductItem from '../../components/ProductItem';

const PRODUCTS = [
  { id: 1, name: 'Áo thun', price: 120000 },
  { id: 2, name: 'Quần jeans', price: 350000 },
  { id: 3, name: 'Giày sneaker', price: 800000 },
  { id: 4, name: 'Mũ lưỡi trai', price: 90000 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShopScreen: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [{ ...product, quantity: 1 }, ...prev];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.cartInfo}>Số mặt hàng trong giỏ: {totalItems}</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem
            name={item.name}
            price={item.price}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  cartInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1976D2',
    textAlign: 'center',
  },
});

export default ShopScreen;
