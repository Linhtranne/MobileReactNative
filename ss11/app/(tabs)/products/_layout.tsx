import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationIndependentTree from 'expo-router/stack';
import ProductListScreen from './list';
import ProductFormScreen from './form';
import ProductDetailScreen from './detail';

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductList">
          <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Danh sách sản phẩm' }} />
          <Stack.Screen name="ProductForm" component={ProductFormScreen} options={{ title: 'Thêm/Cập nhật sản phẩm' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Chi tiết sản phẩm' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
