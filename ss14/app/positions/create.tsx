import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createPosition } from '../../api/positionApi';
import { useRouter } from 'expo-router';

export default function CreatePositionScreen() {
  const [positionName, setPositionName] = useState('');
  const [positionStatus, setPositionStatus] = useState('ACTIVE');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // TODO: Lấy token từ context hoặc state
  const token = undefined;

  const handleSubmit = async () => {
    if (!positionName.trim() || !positionStatus.trim()) {
      Alert.alert('Lỗi', 'Tên vị trí và trạng thái không được để trống');
      return;
    }
    setLoading(true);
    try {
      await createPosition({ positionName, positionStatus, description }, token);
      Alert.alert('Thành công', 'Thêm mới vị trí thành công');
      router.replace('/(tabs)/positions');
    } catch (err: any) {
      Alert.alert('Lỗi', err?.response?.data?.message || 'Thêm mới thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thêm vị trí mới</Text>
      <TextInput
        placeholder="Tên vị trí"
        value={positionName}
        onChangeText={setPositionName}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Trạng thái (ACTIVE)"
        value={positionStatus}
        onChangeText={setPositionStatus}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Mô tả"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <Button title={loading ? 'Đang thêm...' : 'Thêm mới'} onPress={handleSubmit} disabled={loading} />
    </View>
  );
}
