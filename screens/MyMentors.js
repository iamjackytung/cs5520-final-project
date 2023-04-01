import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header } from '../components/Header';
import { Button } from "@rneui/themed";
import { Text } from '@rneui/themed';


export default function MyMentors() {
  return (
    <>
      <Header view="Home" title="My mentors" />  
      {/* <StatusBar style="auto" /> */}
      <View style={styles.container}>
        <Text h4={true}>You don't have any mentor yet!</Text>
        <Button
          style={styles.findMentorsButton}
          title="Find Mentors"
          onPress={() => {
            navigation.navigate("MyMentors");
          }}
        />
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
  findMentorsButton: {
    marginVertical: 10
  }
});