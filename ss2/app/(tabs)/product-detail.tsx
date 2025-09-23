import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Heart, ArrowLeft } from 'lucide-react-native';

const PRODUCT = {
  name: 'Áo Thun Nam Basic',
  rating: 4.9,
  reviews: 86,
  price: 199000,
  oldPrice: 299000,
  sizes: ['S', 'M', 'L', 'XL'],
  selectedSize: 'M',
  description:
    'Áo thun nam chất liệu cotton thoáng mát, kiểu dáng basic dễ phối đồ. Phù hợp mặc hàng ngày, đi học, đi chơi, vận động nhẹ. Đường may chắc chắn, màu sắc trẻ trung.',
  image: 'https://picsum.photos/id/1011/600/400',
};

interface SizeOptionProps {
  size: string;
  selected: boolean;
}
function SizeOption({ size, selected }: SizeOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.sizeOption, selected && styles.sizeOptionSelected]}
      activeOpacity={0.8}
    >
      <Text style={[styles.sizeText, selected && styles.sizeTextSelected]}>{size}</Text>
    </TouchableOpacity>
  );
}

export default function ProductDetailScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Khu vực ảnh sản phẩm + nút */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: PRODUCT.image }} style={styles.productImage} />
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart color="#FF3B30" size={24} />
          </TouchableOpacity>
        </View>
        {/* Thông tin cơ bản */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{PRODUCT.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.ratingText}>{PRODUCT.rating} | {PRODUCT.reviews} Đánh giá</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{PRODUCT.price.toLocaleString()}₫</Text>
            <Text style={styles.oldPrice}>{PRODUCT.oldPrice.toLocaleString()}₫</Text>
          </View>
        </View>
        {/* Lựa chọn size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chọn Kích thước</Text>
          <View style={styles.sizeRow}>
            {PRODUCT.sizes.map((size) => (
              <SizeOption key={size} size={size} selected={size === PRODUCT.selectedSize} />
            ))}
          </View>
        </View>
        {/* Mô tả sản phẩm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.description}>{PRODUCT.description}</Text>
        </View>
      </ScrollView>
      {/* Footer nút hành động */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton} activeOpacity={0.8}>
          <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = Math.floor(width * 0.65);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: IMAGE_HEIGHT,
    marginBottom: 18,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    backgroundColor: '#eee',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#222',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    fontSize: 18,
    marginRight: 4,
    color: '#FFD700',
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  oldPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeOption: {
    borderWidth: 2,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  sizeOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F0FF',
  },
  sizeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  sizeTextSelected: {
    color: '#007AFF',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    gap: 16,
  },
  addToCartButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  addToCartText: {
    color: '#007AFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#FF9500',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
