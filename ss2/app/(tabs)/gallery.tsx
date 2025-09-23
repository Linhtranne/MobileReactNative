import React from 'react';
import { View, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const IMAGE_COUNT = 18;
const IMAGES = Array.from({ length: IMAGE_COUNT }, (_, i) => `https://picsum.photos/id/${i + 10}/300/300`);
const NUM_COLUMNS = 3;
const GAP = 8;
const SCREEN_WIDTH = Dimensions.get('window').width;
const IMAGE_SIZE = Math.floor((SCREEN_WIDTH - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS);

export default function GalleryScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.grid}>
        {IMAGES.map((uri, idx) => (
          <TouchableOpacity key={idx} activeOpacity={0.8} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: GAP,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: GAP,
    marginBottom: GAP,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#eee',
  },
});
