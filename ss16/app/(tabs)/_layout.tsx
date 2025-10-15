import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#3182CE" }}>
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
        name="positions"
        options={{
          headerShown: false,
          title: "Bài 6-10",
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase" size={26} color={color} />
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
      <Tabs.Screen
        name="counter"
        options={{
          title: "Bài 1",
          tabBarIcon: ({ color }) => (
            <Ionicons name="calculator" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="random"
        options={{
          title: "Bài 2",
          tabBarIcon: ({ color }) => (
        <FontAwesome5 name="random" size={24} color="black" />
          ),
        }}
      />
        <Tabs.Screen
          name="displaymode"
          options={{
            title: "Bài 3",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favoriteaccounts"
          options={{
            title: "Bài 4",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="heart" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="language"
          options={{
            title: "Bài 5",
            tabBarIcon: ({ color }) => (
              <Ionicons name="language" size={22} color={color} />
            ),
          }}
        />
    </Tabs>
  );
}
