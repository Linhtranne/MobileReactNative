import { Tabs } from 'expo-router';
import React from 'react';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function TabLayout() {


  return (
      <Tabs screenOptions={{ tabBarActiveTintColor: "#4800ffff" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          headerShown: false,
          title: "Khóa học",
          tabBarIcon: ({ color }) => (
    <FontAwesome name="graduation-cap" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
