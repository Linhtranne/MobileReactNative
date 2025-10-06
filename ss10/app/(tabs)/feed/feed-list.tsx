import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  { id: '1', title: 'Feed Item 1' },
  { id: '2', title: 'Feed Item 2' },
  { id: '3', title: 'Feed Item 3' },
];

export default function FeedListScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Feed List</Text>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 16, borderBottomWidth: 1, borderColor: '#eee' }}
            onPress={() => navigation.navigate('FeedDetail', { id: item.id, title: item.title })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
