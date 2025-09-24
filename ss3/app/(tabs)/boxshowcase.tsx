import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function BoxShowcase() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.verticalCenter}>
        <View style={[styles.box, styles.box1]}><Text style={styles.boxText}>box1</Text></View>
        <View style={[styles.box, styles.box2]}><Text style={styles.boxText}>box2</Text></View>
        <View style={[styles.box, styles.box3]}><Text style={styles.boxText}>box3</Text></View>
        <View style={[styles.box, styles.box4]}><Text style={styles.boxText}>box4</Text></View>
        <View style={[styles.box, styles.box5]}><Text style={styles.boxText}>box5</Text></View>
      </View>
      <View style={styles.horizontalEvenly}>
        <View style={[styles.box, styles.box1]}><Text style={styles.boxText}>box1</Text></View>
        <View style={[styles.box, styles.box2]}><Text style={styles.boxText}>box2</Text></View>
        <View style={[styles.box, styles.box3]}><Text style={styles.boxText}>box3</Text></View>
        <View style={[styles.box, styles.box4]}><Text style={styles.boxText}>box4</Text></View>
        <View style={[styles.box, styles.box5]}><Text style={styles.boxText}>box5</Text></View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.gridRow}>
          <View style={[styles.box, styles.box1]}><Text style={styles.boxText}>box1</Text></View>
          <View style={[styles.box, styles.box2]}><Text style={styles.boxText}>box2</Text></View>
          <View style={[styles.box, styles.box3]}><Text style={styles.boxText}>box3</Text></View>
        </View>
        <View style={styles.gridRow}>
          <View style={[styles.box, styles.box4]}><Text style={styles.boxText}>box4</Text></View>
          <View style={[styles.box, styles.box5]}><Text style={styles.boxText}>box5</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  verticalCenter: {
    alignItems: 'center',
    marginBottom: 20,
  },
  horizontalEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 60,
  },
  gridContainer: {
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 10,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  box1: {
    backgroundColor: '#EF4444',
    width: 100,
    height: 40,
  },
  box2: {
    backgroundColor: '#F97316',
    width: 80,
    height: 50,
  },
  box3: {
    backgroundColor: '#22C55E',
    width: 120,
    height: 60,
  },
  box4: {
    backgroundColor: '#3B82F6',
    width: 90,
    height: 30,
  },
  box5: {
    backgroundColor: '#8B5CF6',
    width: 110,
    height: 55,
  },
});
