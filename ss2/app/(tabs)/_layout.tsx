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
            name="nameinput"
            options={{
              title: 'Bài 3',
            }}
          />
            <Tabs.Screen
              name="terms"
              options={{
                title: 'Bài 4',
              }}
            />
              <Tabs.Screen
                name="login"
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
                    name="chat"
                    options={{
                      title: 'Bài 7',

                    }}
                  />
                    <Tabs.Screen
                    name="buttonshowcase"
                    options={{
                      title: 'Bài 8',
                    }}
                  />
                    <Tabs.Screen
                      name="gallery"
                      options={{
                        title: 'Bài 9',
                      }}
                    />
                      <Tabs.Screen
                        name="registerform"
                        options={{
                          title: 'Bài 10',
                        }}
                      />
                        <Tabs.Screen
                          name="../product-detail"
                          options={{
                            title: 'Chi tiết sản phẩm',
                          }}
                        />
        
    </Tabs>
  );
}
