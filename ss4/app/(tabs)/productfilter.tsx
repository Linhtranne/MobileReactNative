import React, { useState } from 'react';
import { View, Text, TextInput, Switch, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const PRODUCTS = [
  { id: 1, name: 'Áo thun', category: 'Thời trang', inStock: true },
  { id: 2, name: 'Quần jeans', category: 'Thời trang', inStock: false },
  { id: 3, name: 'Giày sneaker', category: 'Giày dép', inStock: true },
  { id: 4, name: 'Mũ lưỡi trai', category: 'Phụ kiện', inStock: true },
  { id: 5, name: 'Túi xách', category: 'Phụ kiện', inStock: false },
  { id: 6, name: 'Dép quai hậu', category: 'Giày dép', inStock: true },
];

const CATEGORIES = ['Tất cả', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

const ProductFilterScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isStockOnly, setIsStockOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredProducts = PRODUCTS.filter(product => {
    const matchName = product.name.toLowerCase().includes(searchText.toLowerCase());
    const matchStock = !isStockOnly || product.inStock;
    const matchCategory = selectedCategory === 'Tất cả' || product.category === selectedCategory;
    return matchName && matchStock && matchCategory;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lọc & Tìm kiếm sản phẩm</Text>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm theo tên..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.row}>
        <Text>Chỉ hiển thị hàng còn trong kho</Text>
        <Switch value={isStockOnly} onValueChange={setIsStockOnly} />
      </View>
      <View style={styles.row}>
        <Text>Danh mục:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={setSelectedCategory}
        >
          {CATEGORIES.map(cat => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={{ color: item.inStock ? '#388E3C' : '#E53935' }}>
              {item.inStock ? 'Còn hàng' : 'Hết hàng'}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Không có sản phẩm phù hợp</Text>}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  picker: {
    flex: 1,
    height: 44,
    marginLeft: 12,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 2,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});

export default ProductFilterScreen;
