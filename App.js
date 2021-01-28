// image-cache
// Based on https://youtu.be/nuoP52d0kqI
// 
// I added an 'expires' prop to <CacheImage />
// 'expires' specifies the maximum age in seconds before image is eviceted from cache
//
// H. Dahle 2020

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import CacheImage from './CacheImage';

export default function App() {
  return (
    <View style={styles.container}>
      <CacheImage style={styles.image} expires={60} uri="https://source.unsplash.com/random/1200x800" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300
  }
});
