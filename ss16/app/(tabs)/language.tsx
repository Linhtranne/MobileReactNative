import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAppDispatch, useAppSelector } from '../../hooks/useStoreHooks';
import { setLanguage } from '../../store/slices/languageSlice';
import { RootState } from '../../store/store';

const TEXTS = {
  en: {
    title: 'Language',
    current: 'Current language:',
    switch: 'Switch to Vietnamese',
    hello: 'Hello!',
  },
  vi: {
    title: 'Ngôn ngữ',
    current: 'Ngôn ngữ hiện tại:',
    switch: 'Chuyển sang tiếng Anh',
    hello: 'Xin chào!',
  },
};

export default function LanguageScreen() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state: RootState) => state.language.lang);
  const t = TEXTS[lang];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.label}>{t.current}</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={lang}
          style={styles.picker}
          onValueChange={(value) => dispatch(setLanguage(value))}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Tiếng Việt" value="vi" />
        </Picker>
      </View>
      <View style={styles.box}>
        <Text style={styles.hello}>{t.hello}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 18 },
  label: { fontSize: 18, marginBottom: 10 },
  lang: { fontWeight: 'bold', color: '#3182CE' },
  pickerBox: { backgroundColor: '#f0f4f8', borderRadius: 12, padding: 8, marginBottom: 18, width: 180 },
  picker: { height: 44, width: '100%' },
  box: { backgroundColor: '#f0f4f8', borderRadius: 12, padding: 18, marginTop: 20, alignItems: 'center' },
  hello: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  desc: { fontSize: 16, color: '#444' },
});
