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
            name="stacksample"
            options={{
              title: 'Bài 1+4',
            }}
          />
          <Tabs.Screen
            name="stack3screens"
            options={{
              title: 'Bài 2',
            }}
          />
          <Tabs.Screen
            name="drawerbasic"
            options={{
              title: 'Bài 3',
            }}
          />
                <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
        }}
      />
      {/* Tab Messages: một màn hình đơn */}
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
        }}
      />
    </Tabs>
  );
}
