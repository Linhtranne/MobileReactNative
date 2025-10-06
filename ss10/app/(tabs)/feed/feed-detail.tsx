import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function FeedDetailScreen() {
  const route = useRoute<any>();
  const { id, title } = route.params || {};
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Feed Detail</Text>
      <Text style={{ fontSize: 16 }}>ID: {id}</Text>
      <Text style={{ fontSize: 16 }}>Title: {title}</Text>
    </View>
  );
}
