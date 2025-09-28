import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const LikeButton: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, liked ? styles.liked : styles.unliked]}
        onPress={() => setLiked((prev) => !prev)}
      >
        <Text style={styles.text}>{liked ? 'Đã thích' : 'Thích'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  unliked: {
    backgroundColor: '#bdbdbd',
  },
  liked: {
    backgroundColor: '#1976D2',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LikeButton;
