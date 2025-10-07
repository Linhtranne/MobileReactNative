import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './home-screen';
import ProductListScreen from './product-list-screen';
import ProductDetailScreen from './product-detail-screen';
import CartScreen from './cart-screen';
import { CartProvider } from './cart-context';
import CartHeaderIcon from './cart-header-icon';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <CartProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerRight: () => <CartHeaderIcon />,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trang chủ' }} />
            <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Product List' }} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Giỏ hàng' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </CartProvider>
  );
}
