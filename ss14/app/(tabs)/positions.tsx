import React from 'react';
import { View, Button } from 'react-native';
import PositionList from '../../components/PositionList';
import { useRouter } from 'expo-router';

export default function PositionsScreen({ token: propToken }: { token?: string }) {
  const router = useRouter();

  const token = propToken || '';

  return (
    <View style={{ flex: 1 }}>
      <Button title="Thêm vị trí mới" onPress={() => router.push('/(tabs)/positions/create')} />
      <PositionList token={token} />
    </View>
  );
}
