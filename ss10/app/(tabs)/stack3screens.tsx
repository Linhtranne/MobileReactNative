import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation, route }: any) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, route.name === 'Home' && styles.active]}>Home Screen</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function SettingsScreen({ navigation, route }: any) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, route.name === 'Settings' && styles.active]}>Settings Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

function ProfileScreen({ navigation, route }: any) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, route.name === 'Profile' && styles.active]}>Profile Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const Stack3Screens = () => (
  <NavigationIndependentTree>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
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
  active: {
    textDecorationLine: 'underline',
    color: '#d32f2f',
  },
});

export default Stack3Screens;
