import React from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedListScreen from './feed-list';
import FeedDetailScreen from './feed-detail';

const Stack = createNativeStackNavigator();

export default function FeedStack() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FeedList" component={FeedListScreen} options={{ title: 'Feed' }} />
          <Stack.Screen name="FeedDetail" component={FeedDetailScreen} options={{ title: 'Feed Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}
