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
        name="welcomestorage"
        options={{
          title: 'Bài 1+4',
        }}
      />
      <Tabs.Screen
        name="nightmodeswitch"
        options={{
          title: 'Bài 2',
        }}
      />
      <Tabs.Screen
        name="persistcounter"
        options={{
          title: 'Bài 3',
        }}
      />
      <Tabs.Screen
        name="persisttodolist"
        options={{
          title: 'Bài 5',
        }}
      />
      <Tabs.Screen
        name="settingspersist"
        options={{
          title: 'Bài 6',
        }}
      />
      <Tabs.Screen
        name="cartpersist"
        options={{
          title: 'Bài 7',
        }}
      />
      <Tabs.Screen
        name="usermigration"
        options={{
          title: 'Bài 8',
        }}
      />
      
    </Tabs>
  );
}
