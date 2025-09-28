import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BUTTONS = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', 'C', '=', '+'],
];

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [current, setCurrent] = useState('');
  const [operator, setOperator] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setCurrent('');
      setOperator(null);
      setPrev(null);
      setResult(null);
      return;
    }
    if (val === '=') {
      if (operator && prev !== null && current !== '') {
        const a = parseFloat(prev);
        const b = parseFloat(current);
        let res = '';
        switch (operator) {
          case '+': res = (a + b).toString(); break;
          case '-': res = (a - b).toString(); break;
          case '*': res = (a * b).toString(); break;
          case '/': res = b !== 0 ? (a / b).toString() : 'Lỗi'; break;
        }
        setDisplay(res);
        setResult(res);
        setPrev(null);
        setCurrent('');
        setOperator(null);
      }
      return;
    }
    if (['+', '-', '*', '/'].includes(val)) {
      if (current !== '') {
        setPrev(current);
        setOperator(val);
        setCurrent('');
        setDisplay(current + ' ' + val);
      } else if (result) {
        setPrev(result);
        setOperator(val);
        setCurrent('');
        setDisplay(result + ' ' + val);
        setResult(null);
      }
      return;
    }
    // Số
    if (current.length < 12) {
      const newCurrent = current === '' && val === '0' ? '0' : current + val;
      setCurrent(newCurrent);
      setDisplay((operator && prev ? prev + ' ' + operator + ' ' : '') + newCurrent);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text style={styles.displayText} numberOfLines={1} ellipsizeMode="head">{display}</Text>
      </View>
      <View style={styles.grid}>
        {BUTTONS.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={[styles.button, btn === '=' ? styles.equal : btn === 'C' ? styles.clear : /[+\-*/]/.test(btn) ? styles.op : null]}
                onPress={() => handlePress(btn)}
              >
                <Text style={styles.btnText}>{btn}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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
  displayBox: {
    width: 320,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  displayText: {
    fontSize: 32,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  grid: {
    width: 320,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    marginHorizontal: 6,
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  op: {
    backgroundColor: '#90caf9',
  },
  equal: {
    backgroundColor: '#1976D2',
  },
  clear: {
    backgroundColor: '#E53935',
  },
});

export default Calculator;
