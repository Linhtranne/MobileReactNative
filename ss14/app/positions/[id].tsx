import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getPositionDetail, updatePosition, deletePosition } from '../../api/positionApi';

export default function PositionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [position, setPosition] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  // TODO: Lấy token từ context hoặc state
  const token = '';

  useEffect(() => {
    const fetchDetail = async () => {
      try {
  const res = await getPositionDetail(Number(id), token);
        setPosition(res.data);
      } catch {
        Alert.alert('Lỗi', 'Không lấy được chi tiết vị trí');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, token]);

  const handleDelete = async () => {
    setLoading(true);
    try {
  await deletePosition(Number(id), token);
      Alert.alert('Thành công', 'Xóa vị trí thành công');
  router.replace('/positions');
    } catch {
      Alert.alert('Lỗi', 'Xóa vị trí thất bại');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (!position) return <Text>Không tìm thấy vị trí</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{position.positionName}</Text>
      <Text>Mô tả: {position.description}</Text>
      <Text>Trạng thái: {position.positionStatus}</Text>
      <Text>Ngày tạo: {position.CreatedAt}</Text>
      <Button title="Sửa" onPress={() => setShowEdit(true)} />
      <Button title="Xóa" color="red" onPress={() => setShowDeleteModal(true)} />
      {showDeleteModal && (
        <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, marginTop: 16 }}>
          <Text>Bạn có chắc muốn xóa vị trí này?</Text>
          <Button title="Hủy" onPress={() => setShowDeleteModal(false)} />
          <Button title="Xóa" color="red" onPress={handleDelete} />
        </View>
      )}
      {showEdit && (
        <EditPositionForm position={position} token={token} onClose={() => setShowEdit(false)} />
      )}
    </View>
  );
}

function EditPositionForm({ position, token, onClose }: { position: any; token: string; onClose: () => void }) {
  const [positionName, setPositionName] = useState(position.positionName);
  const [positionStatus, setPositionStatus] = useState(position.positionStatus);
  const [description, setDescription] = useState(position.description);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async () => {
    if (!positionName.trim() || !positionStatus.trim()) {
      Alert.alert('Lỗi', 'Tên vị trí và trạng thái không được để trống');
      return;
    }
    setLoading(true);
    try {
      await updatePosition(position.id, { positionName, positionStatus, description }, token);
      Alert.alert('Thành công', 'Cập nhật vị trí thành công');
      onClose();
  router.replace('/positions');
    } catch {
      Alert.alert('Lỗi', 'Cập nhật thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8, marginTop: 16 }}>
      <Text style={{ fontWeight: 'bold' }}>Sửa vị trí</Text>
      <TextInput
        placeholder="Tên vị trí"
        value={positionName}
        onChangeText={setPositionName}
        style={{ borderWidth: 1, marginVertical: 8, padding: 8 }}
      />
      <TextInput
        placeholder="Trạng thái"
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
      <Button title={loading ? 'Đang cập nhật...' : 'Cập nhật'} onPress={handleUpdate} disabled={loading} />
      <Button title="Đóng" onPress={onClose} />
    </View>
  );
}
