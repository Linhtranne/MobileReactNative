import React, { useState } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput } from 'react-native';

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

interface Section {
  title: string;
  data: string[];
}

function filterSections(sections: Section[], keyword: string): Section[] {
  if (!keyword.trim()) return sections;
  const lower = keyword.toLowerCase();
  return sections
    .map((section: Section) => ({
      title: section.title,
      data: section.data.filter((item: string) => item.toLowerCase().includes(lower)),
    }))
    .filter((section: Section) => section.data.length > 0);
}

const SectionListSearchDemo: React.FC = () => {
  const [search, setSearch] = useState('');
  const filteredSections = filterSections(DATA, search);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm..."
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={filteredSections}
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
        ListEmptyComponent={<Text style={styles.empty}>Không tìm thấy kết quả</Text>}
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
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 12,
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
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});

export default SectionListSearchDemo;
