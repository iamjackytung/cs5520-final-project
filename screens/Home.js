import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { Header } from '../components/Header';

export default function Home({ navigation }) {

  return (
    <>
      <Header view="Home" title="Home" />  
      <View style={styles.container}>
      <Button title="My Mentors" onPress={() => {navigation.navigate("MyMentors")}}/>
      <StatusBar style="auto" />
      </View>
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