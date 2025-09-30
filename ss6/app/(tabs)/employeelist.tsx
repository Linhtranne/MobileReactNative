import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EMPLOYEES = [
  { id: '1', name: 'Nguyễn Văn A'},
  { id: '2', name: 'Trần Thị B' },
  { id: '3', name: 'Lê Văn C' },
  { id: '4', name: 'Phạm Thị D'},
  { id: '5', name: 'Hoàng Văn E' },
  { id: '6', name: 'Vũ Thị F'},
  { id: '7', name: 'Đặng Văn G' },
  { id: '8', name: 'Phan Thị H' },
    { id: '9', name: 'Trịnh Văn I' },
    { id: '10', name: 'Bùi Thị K' },
    { id: '11', name: 'Đỗ Văn L' },
    { id: '12', name: 'Hồ Thị M' },
    { id: '13', name: 'Ngô Văn N' },
    { id: '14', name: 'Dương Thị O' },
    { id: '15', name: 'Lý Văn P' },
    { id: '16', name: 'Tạ Thị Q' },
    { id: '17', name: 'Trần Văn R' },
    { id: '18', name: 'Phạm Thị S' },
    { id: '19', name: 'Võ Văn T' },
    { id: '20', name: 'Lâm Thị U' },
    
];

const EmployeeList: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={EMPLOYEES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
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
  position: {
    fontSize: 15,
    color: '#333',
  },
});

export default EmployeeList;
