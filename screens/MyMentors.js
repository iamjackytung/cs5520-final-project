import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header } from '../components/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function MyMentors() {
  return (
    <>
      <Header view="Home" title="My mentors" />  
      <Text>MyMentors</Text>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});