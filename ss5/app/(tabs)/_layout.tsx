import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
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
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="businesscarddemo"
        options={{
          title: 'Bài 1',
        }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          title: 'Bài 3',
        }}
      />
      <Tabs.Screen
        name="likebutton"
        options={{
          title: 'Bài 4',
        }}
      />
      <Tabs.Screen
        name="loginform"
        options={{
          title: 'Bài 5',
        }}
      />
      <Tabs.Screen
        name="todolist"
        options={{
          title: 'Bài 6',
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'Bài 8',
        }}
      />
      <Tabs.Screen
        name="trafficlight"
        options={{
          title: 'Bài 9',
        }}
      />
      <Tabs.Screen
        name="colorpicker"
        options={{
          title: 'Bài 10',
        }}
      />
    </Tabs>
  );
}
