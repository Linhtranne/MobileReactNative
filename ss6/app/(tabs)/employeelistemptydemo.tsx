import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Employee {
  id: string;
  name: string;
}

const INITIAL_EMPLOYEES: Employee[] = [];

const EmployeeListEmptyDemo: React.FC = () => {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  const handleAdd = () => {
    const nextId = (employees.length + 1).toString();
    setEmployees([...employees, { id: nextId, name: `Dữ liệu ${nextId}` }]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>Thêm dữ liệu</Text>
      </TouchableOpacity>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Không có dữ liệu</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default EmployeeListEmptyDemo;
