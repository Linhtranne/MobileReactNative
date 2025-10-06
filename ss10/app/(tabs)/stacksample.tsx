import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer, NavigationIndependentTree, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const PRODUCTS = [
  { id: 'p1', name: 'iPhone 15 Pro' },
  { id: 'p2', name: 'MacBook Air M3' },
  { id: 'p3', name: 'Apple Watch Series 9' },
];

function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Details', { productId: item.id })}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const productId = route.params?.productId ?? 'Không có ID';
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết sản phẩm</Text>
      <Text style={styles.subtitle}>Product ID: {productId}</Text>
      <Button title="Quay lại" onPress={() => navigation.goBack()} />
    </View>
  );
}

const StackSample = () => (
  <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </NavigationIndependentTree>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#333',
  },
  item: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
});

export default StackSample;
