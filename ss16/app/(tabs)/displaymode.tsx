import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { toggleMode } from '../../store/slices/displayModeSlice';
import { RootState } from '../../store/store';

const DATA = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, name: `Bản ghi ${i + 1}` }));

export default function DisplayModeScreen() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state: RootState) => state.displayMode.mode);

  return (
    <View style={styles.container}>
      <Button title={mode === 'list' ? 'List Mode' : 'Grid Mode'} onPress={() => dispatch(toggleMode())} />
      {mode === 'list' ? (
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.name}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.gridWrap}>
          {DATA.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <Text style={styles.gridText}>{item.name}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  listItem: { padding: 14, borderBottomWidth: 1, borderColor: '#eee' },
  listText: { fontSize: 18 },
  gridWrap: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 },
  gridItem: {
    width: '44%',
    margin: '3%',
    backgroundColor: '#ff0000ff',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  gridText: { fontSize: 17, fontWeight: 'bold', color: '#ffffffff' },
});
