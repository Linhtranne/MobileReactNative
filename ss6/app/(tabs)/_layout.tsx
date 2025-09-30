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
        name="employeelist"
        options={{
          title: 'Bài 1',
        }}
      />
      <Tabs.Screen
        name="employeelistemptydemo"
        options={{
          title: 'Bài 2',
        }}
      />
      <Tabs.Screen
        name="courselistdemo"
        options={{
          title: 'Bài 3',
        }}
      />
      <Tabs.Screen
        name="courselistloadmorerefresh"
        options={{
          title: 'Bài 4',
        }}
      />
      <Tabs.Screen
        name="devicesectionlist"
        options={{
          title: 'Bài 5',
        }}
      />
        <Tabs.Screen
        name="sectionlistdemo"
        options={{
          title: 'Bài 6',
        }}
      />
      <Tabs.Screen
        name="productlistdemo"
        options={{
          title: 'Bài 7',
        }}
      />
    <Tabs.Screen
      name="bloglistdemo"
      options={{
        title: 'Bài 8',
      }}
    />
      
    </Tabs>
  );
}
