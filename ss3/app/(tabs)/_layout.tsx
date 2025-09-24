
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppHeader from '@/components/app-header';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="SS3" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Index',
          }}
        />
        <Tabs.Screen
          name="profilecard"
          options={{
            title: 'Bài 1'
          }}
        />
        <Tabs.Screen
          name="boxshowcase"
          options={{
            title: 'Bài 2'
          }}
        />
        <Tabs.Screen
          name="socialpost"
          options={{
            title: 'Bài 3'
          }}
        />
        <Tabs.Screen
          name="login"
          options={{
            title: 'Bài 4'
          }}
        />
        <Tabs.Screen
          name="product-grid"
          options={{
            title: 'Bài 7'
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            title: 'Bài 8'
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
