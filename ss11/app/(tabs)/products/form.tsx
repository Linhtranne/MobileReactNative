import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProductFormScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { mode, product } = route.params || {};
  const isEdit = mode === 'edit';

  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price ? String(product.price) : '');
  const [image, setImage] = useState(product?.image || '');
  const [status, setStatus] = useState(product?.status || 'Chưa bán');
  const [error, setError] = useState('');

  useEffect(() => { setError(''); }, [name, price]);

  const validate = async () => {
    if (!name.trim()) return setError('Tên sản phẩm không được để trống');
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) return setError('Giá tiền phải lớn hơn 0');
    const stored = await AsyncStorage.getItem('PRODUCTS');
    const arr = stored ? JSON.parse(stored) : [];
    if (arr.some((p: any) => p.name === name && (!isEdit || p.id !== product.id))) return setError('Tên sản phẩm đã tồn tại');
    return '';
  };

  const handleSave = async () => {
    const err = await validate();
    if (err) return;
    const stored = await AsyncStorage.getItem('PRODUCTS');
    let arr = stored ? JSON.parse(stored) : [];
    if (isEdit) {
      arr = arr.map((p: any) => p.id === product.id ? { ...p, name, description, price: Number(price), image, status } : p);
    } else {
      arr = [
        ...arr,
        { id: Date.now().toString(), name, description, price: Number(price), image, status },
      ];
    }
    await AsyncStorage.setItem('PRODUCTS', JSON.stringify(arr));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 12 }}>{isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</Text>
      {error ? <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text> : null}
      <Text>Tên sản phẩm</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: 8 }} />
      <Text>Mô tả</Text>
      <TextInput value={description} onChangeText={setDescription} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: 8 }} />
      <Text>Giá tiền</Text>
      <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: 8 }} />
      <Text>Link hình ảnh</Text>
      <TextInput value={image} onChangeText={setImage} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 8, padding: 8 }} />
      <Text>Trạng thái</Text>
      <TextInput value={status} onChangeText={setStatus} style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 16, padding: 8 }} />
      <Button title={isEdit ? 'Cập nhật' : 'Thêm mới'} onPress={handleSave} />
    </View>
  );
}
