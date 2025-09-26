import React  from 'react';
import { View, Text, Button } from 'react-native';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
const Counter: React.FC = () => {
    const [count, setCount] = useState(0);
    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 40 }}>{count}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Button title="+" onPress={() => setCount(count - 1)} color="blue" />
        <View style={{ width: 20 }} />
        <Button title="-" onPress={() => setCount(count + 1)} color="blue" />
      </View>
    </View>
    );
};

export default Counter;