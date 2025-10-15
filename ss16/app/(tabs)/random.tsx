import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { generate } from '../../store/slices/randomListSlice';
import { RootState } from '../../store/store';

export default function RandomListScreen() {
  const dispatch = useAppDispatch();
  const numbers = useAppSelector((state: RootState) => state.randomList.numbers);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách số ngẫu nhiên</Text>

      <View style={styles.box}>
        {numbers.length === 0 ? (
          <Text style={styles.empty}></Text>
        ) : (
          numbers.map((num, idx) => (
            <Text key={idx} style={styles.item}>{num}</Text>
          ))
        )}
      </View>
      <View style={styles.buttonRow}>
        <Button title="Tạo mới" onPress={() => dispatch(generate({ length: 4 }))} />
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  box: {
    minWidth: 180,
    minHeight: 80,
    backgroundColor: '#f0f4f8',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
      flexDirection: 'row',
      gap: 16,
  },
  item: { fontSize: 22, fontWeight: 'bold', marginVertical: 6, color: '#2B6CB0' },
  empty: { fontSize: 16, color: 'gray', marginTop: 10 },
});
