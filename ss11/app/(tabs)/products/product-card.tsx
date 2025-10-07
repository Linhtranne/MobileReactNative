import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ product, onPress, onEdit, onDelete }: { product: any; onPress: () => void; onEdit: () => void; onDelete: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 12 }}>
      <Image source={{ uri: product.image }} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 16 }} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>{product.name}</Text>
          {product.status && (
            <View style={{
              backgroundColor:
                product.status === 'Đang bán' ? '#4caf50' :
                product.status === 'Ngừng bán' ? '#bdbdbd' : '#ff9800',
              borderRadius: 6,
              paddingHorizontal: 6,
              paddingVertical: 2,
              marginLeft: 2,
            }}>
              <Text style={{ color: 'white', fontSize: 11 }}>{product.status}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: '#666', marginVertical: 4 }}>{product.description}</Text>
        <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>{product.price}₫</Text>
      </View>
      <TouchableOpacity onPress={onEdit} style={{ marginLeft: 8 }}>
        <Ionicons name="create-outline" size={22} color="#1976d2" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={{ marginLeft: 8 }}>
        <Ionicons name="trash-outline" size={22} color="#d32f2f" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
