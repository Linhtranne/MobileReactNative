import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { toggleLike } from '../../store/slices/favoriteAccountsSlice';
import { RootState } from '../../store/store';
import { FontAwesome } from '@expo/vector-icons';

export default function FavoriteAccountsScreen() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state: RootState) => state.favoriteAccounts.accounts);

  return (
    <View style={styles.container}>
      <FlatList
        data={accounts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountRow}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.likeBox}>
              <TouchableOpacity onPress={() => dispatch(toggleLike(item.id))}>
                <FontAwesome name={item.liked ? 'heart' : 'heart-o'} size={28} color={item.liked ? '#E53E3E' : '#888'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Không có tài khoản nào</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: { fontSize: 18, fontWeight: '500' },
  likeBox: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  likes: { fontSize: 18, marginLeft: 6, color: '#E53E3E', fontWeight: 'bold' },
  empty: { fontSize: 16, color: 'gray', marginTop: 20 },
});
