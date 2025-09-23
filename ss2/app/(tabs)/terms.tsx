import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const termsText = `Điều khoản sử dụng
. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet cursus, enim erat dictum urna, nec dictum massa enim nec sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eu dictum enim enim nec sem. Vivamus euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eu dictum enim enim nec sem. Vivamus euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eu dictum enim enim nec sem. Vivamus euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, eu dictum enim enim nec sem.`;

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điều khoản sử dụng</Text>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>{termsText}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
    color: '#222',
  },
});
