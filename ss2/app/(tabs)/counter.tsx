import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 40 }}>{count}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Giảm" onPress={() => setCount(count - 1)} color="red" />
        <View style={{ width: 20 }} />
        <Button title="Tăng" onPress={() => setCount(count + 1)} color="green" />
      </View>
    </View>
  );
}
