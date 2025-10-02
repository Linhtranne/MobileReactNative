import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'cartItems';

interface Product {
  productId: string;
  name: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  { productId: 'a1', name: 'Laptop' },
  { productId: 'b2', name: 'Điện thoại' },
  { productId: 'c3', name: 'Tai nghe' },
];

const CartPersist: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value) setCart(JSON.parse(value));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const addToCart = async (product: Product) => {
    let newCart = [...cart];
    const idx = newCart.findIndex(item => item.productId === product.productId);
    if (idx !== -1) {
      newCart[idx].quantity += 1;
    } else {
      newCart.push({ ...product, quantity: 1 });
    }
    setCart(newCart);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      {PRODUCTS.map(product => (
        <View key={product.productId} style={styles.productRow}>
          <Text style={styles.productName}>{product.name}</Text>
          <Button title="Thêm vào giỏ" onPress={() => addToCart(product)} />
        </View>
      ))}
      <Text style={styles.title}>Giỏ hàng</Text>
      <FlatList
        data={cart}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartQty}>x{item.quantity}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  productName: {
    fontSize: 17,
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 8,
  },
  cartText: {
    fontSize: 16,
    color: '#222',
  },
  cartQty: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
    fontSize: 16,
  },
});

export default CartPersist;
