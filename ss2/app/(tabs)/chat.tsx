import React, { useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const messages = [
  { text: 'Chào cậu, cậu khỏe không?', sender: 'other' },
  { text: 'Tớ khỏe, cảm ơn cậu. Còn cậu thì sao?', sender: 'me' },
  { text: 'Tớ cũng ổn. Đang làm gì đó', sender: 'other' },
  { text: 'Tớ đang học React Native, khá là thú vị đó !', sender: 'me' },
];

export default function ChatScreen() {
  const [input, setInput] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={[styles.bubble, msg.sender === 'me' ? styles.bubbleMe : styles.bubbleOther]}
            >
              <Text style={msg.sender === 'me' ? styles.textMe : styles.textOther}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 24,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  bubbleMe: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  textMe: {
    color: '#fff',
    fontSize: 16,
  },
  textOther: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#eee',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  sendButton: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
