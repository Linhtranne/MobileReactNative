import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

// Dữ liệu sản phẩm giả lập
const initialData = [
  {
    id: '1',
    name: 'iPhone 13',
    price: 799,
    description: 'Điện thoại thông minh Apple iPhone 13.',
    details: 'Màn hình 6.1 inch, camera 12MP, bộ nhớ 128GB.',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21',
    price: 999,
    description: 'Điện thoại cao cấp Samsung Galaxy S21.',
    details: 'Màn hình 6.2 inch, camera 64MP, bộ nhớ 128GB.',
  },
  {
    id: '3',
    name: 'MacBook Pro',
    price: 1299,
    description: 'Máy tính xách tay Apple MacBook Pro.',
    details: 'Màn hình Retina 13 inch, vi xử lý M1, 256GB SSD.',
  },
  {
    id: '4',
    name: 'Dell XPS 13',
    price: 1099,
    description: 'Laptop Dell XPS 13 với thiết kế mỏng nhẹ.',
    details: 'Màn hình 13 inch, vi xử lý Intel Core i7, 512GB SSD.',
  },
  {
    id: '5',
    name: 'Sony WH-1000XM4',
    price: 349,
    description: 'Tai nghe Sony WH-1000XM4 chống ồn.',
    details: 'Chống ồn chủ động, thời gian sử dụng lên đến 30 giờ.',
  },
  {
    id: '6',
    name: 'Apple Watch Series 7',
    price: 399,
    description: 'Đồng hồ thông minh Apple Watch Series 7.',
    details: 'Màn hình 1.7 inch, GPS, theo dõi sức khoẻ.',
  },
  {
    id: '7',
    name: 'iPad Pro',
    price: 799,
    description: 'Máy tính bảng Apple iPad Pro.',
    details: 'Màn hình 11 inch, chip M1, bộ nhớ 128GB.',
  },
];

const newData = [
  {
    id: '8',
    name: 'Google Pixel 6',
    price: 599,
    description: 'Điện thoại Google Pixel 6.',
    details: 'Màn hình 6.4 inch, camera 50MP, bộ nhớ 128GB.',
  },
  {
    id: '9',
    name: 'OnePlus 9 Pro',
    price: 1069,
    description: 'Điện thoại OnePlus 9 Pro.',
    details: 'Màn hình 6.7 inch, camera 48MP, bộ nhớ 256GB.',
  },
  {
    id: '10',
    name: 'Apple AirPods Pro',
    price: 249,
    description: 'Tai nghe không dây Apple AirPods Pro.',
    details: 'Chống ồn chủ động, thời gian sử dụng lên đến 24 giờ.',
  },
];

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string;
}

const ProductListDemo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  const handleLoadMore = () => {
    if (!loadingMore && !hasLoadedMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setProducts(prev => [...prev, ...newData]);
        setLoadingMore(false);
        setHasLoadedMore(true);
      }, 1500);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Giá: ${item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.details}>{item.details}</Text>
    </View>
  );

  const ListHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>
        Danh sách sản phẩm ({products.length})
      </Text>
    </View>
  );

  const ListFooter = () => (
    loadingMore ? (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
        <Text style={styles.footerText}>Đang tải thêm...</Text>
      </View>
    ) : null
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  price: {
    fontSize: 16,
    color: '#444',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  details: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  footerContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#007AFF',
  },
});

export default ProductListDemo;
