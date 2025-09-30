import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const DATA = [
  {
    title: 'Điện thoại',
    data: ['iPhone 15', 'Samsung Galaxy S23', 'Xiaomi 13', 'Oppo Reno8'],
  },
  {
    title: 'Laptop',
    data: ['MacBook Pro', 'Dell XPS 13', 'HP Spectre x360', 'Lenovo ThinkPad'],
  },
  {
    title: 'Máy tính bảng',
    data: ['iPad Pro', 'Samsung Tab S9', 'Xiaomi Pad 6'],
  },
];

const DeviceSectionList: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerBox}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerBox: {
    backgroundColor: '#1976D2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 6,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DeviceSectionList;
