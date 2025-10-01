import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import useDebounce from '../hooks/useDebounce';

const fakeSearchApi = (query: string): Promise<string[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query.trim()) return resolve([]);
      resolve([
        `Kết quả cho "${query}" #1`,
        `Kết quả cho "${query}" #2`,
        `Kết quả cho "${query}" #3`,
      ]);
    }, 700);
  });
};

const DebounceDemo: React.FC = () => {
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedText.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fakeSearchApi(debouncedText).then(res => {
      setResults(res);
      setLoading(false);
    });
  }, [debouncedText]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm kiếm (debounce 500ms)</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Nhập từ khóa..."
      />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      <View style={styles.results}>
        {results.map((item, idx) => (
          <Text key={idx} style={styles.resultItem}>{item}</Text>
        ))}
        {!loading && !results.length && debouncedText.trim() !== '' && (
          <Text style={styles.noResult}>Không có kết quả</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  results: {
    marginTop: 24,
  },
  resultItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  noResult: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default DebounceDemo;
