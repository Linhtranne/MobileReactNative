import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPositions } from '../api/positionApi';
import { useRouter } from 'expo-router';

const PositionList = ({ token }: { token?: string }) => {
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPositions(token);
        setPositions(res.data);
      } catch {
        setError('Lỗi khi lấy danh sách vị trí');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={positions}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({ pathname: '/position/[id]', params: { id: item.id.toString() } })}>
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.positionName}</Text>
              <Text>{item.description}</Text>
              <Text>Status: {item.positionStatus}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PositionList;
