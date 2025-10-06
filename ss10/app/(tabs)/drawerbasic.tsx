import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đây là màn hình home</Text>
      <Text style={styles.titles}>Nhấn vào icon trên kia để mở menu </Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
    </View>
  );
}

const DrawerBasic = () => (
  <NavigationIndependentTree>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }: { navigation: any }) => ({
          })}
        />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000000ff',
  },
    titles: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#5f6469ff',
  },
});

export default DrawerBasic;
