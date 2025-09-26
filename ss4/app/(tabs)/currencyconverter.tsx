import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CurrencyInput from '../../components/CurrencyInput';

const EXCHANGE_RATE = 25000;

const CurrencyConverter: React.FC = () => {
  const [vnd, setVnd] = useState('');
  const [usd, setUsd] = useState('');

  const handleVndChange = (value: string) => {
    setVnd(value);
    const vndNum = parseFloat(value);
    if (!isNaN(vndNum)) {
      setUsd((vndNum / EXCHANGE_RATE).toFixed(2));
    } else {
      setUsd('');
    }
  };

  const handleUsdChange = (value: string) => {
    setUsd(value);
    const usdNum = parseFloat(value);
    if (!isNaN(usdNum)) {
      setVnd((usdNum * EXCHANGE_RATE).toFixed(0));
    } else {
      setVnd('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chuyển đổi tiền tệ</Text>
      <CurrencyInput label="VND" value={vnd} onChange={handleVndChange} />
      <CurrencyInput label="USD" value={usd} onChange={handleUsdChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default CurrencyConverter;
