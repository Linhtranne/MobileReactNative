import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

interface HeaderProps {
  title: string;
}

export default function AppHeader({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: '#fff',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        alignItems: 'center',
      },
      android: {
        backgroundColor: '#1976D2',
        elevation: 4,
        alignItems: 'flex-start',
      },
    }),
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        color: '#222',
        textAlign: 'center',
        width: '100%',
      },
      android: {
        color: '#fff',
        textAlign: 'left',
      },
    }),
  },
});
