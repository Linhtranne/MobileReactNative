import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="userlist"
        options={{
          title: 'Bài 1',
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Bài 2',
        }}
      />
      <Tabs.Screen
        name="bulbtoggle"
        options={{
          title: 'Bài 3',
        }}
      />
      <Tabs.Screen
        name="loginform"
        options={{
          title: 'Bài 4',
        }}
      />
      <Tabs.Screen
        name="currencyconverter"
        options={{
          title: 'Bài 5',
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: 'Bài 6',
        }}
      />
      <Tabs.Screen
        name="registerform"
        options={{
          title: 'Bài 7',
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Bài 8',
        }}
      />
      <Tabs.Screen
        name="wizardform"
        options={{
          title: 'Bài 9',
        }}
      />
      <Tabs.Screen
        name="productfilter"
        options={{
          title: 'Bài 10',
        }}
      />
    </Tabs>
  );
}
