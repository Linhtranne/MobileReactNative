import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { increment, decrement} from '../../store/slices/counterSlice';
import { RootState } from '../../store/store';

export default function CounterScreen() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state: RootState) => state.counter.value);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bộ đếm</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.buttonRow}>
        <Button title="Giảm" onPress={() => dispatch(decrement())} color="red" />
        <Button title="Tăng" onPress={() => dispatch(increment())} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  value: { fontSize: 48, fontWeight: 'bold', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', gap: 10 },
});
