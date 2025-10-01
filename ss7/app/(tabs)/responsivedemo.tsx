import React from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';

const data = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  { id: '4', name: 'Item 4' },
  { id: '5', name: 'Item 5' },
  { id: '6', name: 'Item 6' },
];

const ResponsiveDemo: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const numColumns = isPortrait ? 1 : 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Giao diện {isPortrait ? 'Dọc (Portrait)' : 'Ngang (Landscape)'}
      </Text>
      <FlatList
        data={data}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, numColumns === 2 && styles.itemLandscape]}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000ff',
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    margin: 8,
    borderRadius: 8,
    minWidth: 180,
    alignItems: 'center',
    flex: 1,
  },
  itemLandscape: {
    minWidth: 140,
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default ResponsiveDemo;
