import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import { ProfileCard } from '@/components/profile-card';

export default function HomeScreen() {
  return (
          <ThemedView style={{ alignItems: 'center', marginTop: 24 }}>
        <ProfileCard />
      </ThemedView>
  );
}

