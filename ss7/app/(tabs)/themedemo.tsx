import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

const DeepChild = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.box, theme === 'dark' ? styles.darkBox : styles.lightBox]}>
      <Text style={[styles.text, theme === 'dark' ? styles.darkText : styles.lightText]}>
        Đây là component con lồng sâu
      </Text>
    </View>
  );
};

const Child = () => (
  <View style={{ margin: 16 }}>
    <DeepChild />
  </View>
);

const ThemeDemo: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkBox : styles.lightBox]}>
      <Text style={[styles.title, theme === 'dark' ? styles.darkText : styles.lightText]}>
        Demo useContext - Theme {theme === 'dark' ? 'Tối' : 'Sáng'}
      </Text>
      <Button
        title={theme === 'dark' ? 'Chuyển sang Sáng' : 'Chuyển sang Tối'}
        onPress={toggleTheme}
      />
      <Child />
    </View>
  );
};

const AppWithProvider = () => (
  <ThemeProvider>
    <ThemeDemo />
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  box: {
    padding: 24,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  lightBox: {
    backgroundColor: '#fff',
  },
  darkBox: {
    backgroundColor: '#222',
  },
  text: {
    fontSize: 18,
  },
  lightText: {
    color: '#222',
  },
  darkText: {
    color: '#fff',
  },
});

export default AppWithProvider;
