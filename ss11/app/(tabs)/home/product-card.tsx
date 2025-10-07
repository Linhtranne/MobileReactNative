import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function ProductCard({ product, onPress }: { product: any; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 12 }}>
      <Image source={{ uri: product.image }} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
        <Text style={{ color: '#666', marginVertical: 4 }}>{product.description}</Text>
        <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>{product.price}₫</Text>
      </View>
    </TouchableOpacity>
  );
}
