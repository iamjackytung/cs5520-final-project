import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { auth } from "../Firebase/firebase-setup";
import { Input, Icon, Button } from '@rneui/themed';
import { Header } from "../components/Header";
import AddressAutocomplete from "../components/AddressAutocomplete";
import DurationSelect from "../components/DurationSelect";


export default function Booking() {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit() {

  }

  function onCancel() {

  }

  return (
    <View style={styles.container}>
      <Header title="Booking" />
      <View style={styles.content}>
        <View style={styles.inputRow}>
          <Icon style={styles.icon} size={24} name='comment-o' type="font-awesome"
          />
          <Input
          // ref={input}
          value={topic}
          onChangeText={setTopic}
          containerStyle={styles.input}
          placeholder='Topic'
        />
        </View>
        <View style={styles.inputRow}>
          <Icon style={styles.icon} size={24} name='calendar-o' type="font-awesome" />
          <Input
          value={date}
          onChangeText={setDate}
          containerStyle={styles.input}
          placeholder='Date and Time'
          />
        </View>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="clockcircleo"
            type="antdesign"
          />
          <DurationSelect onSelectDuration={setDuration}/>
        </View>
        <View style={styles.inputRow}>
          <Icon style={styles.icon} size={24} name='location-outline' type="ionicon" />
          <AddressAutocomplete onChangeLocation={setLocation}/>
        </View>
        <View style={styles.inputRow}>
          <Icon style={styles.icon} size={24} name='sticky-note-o' type="font-awesome" />
          <Input
          multiline
          value={description}
          onChangeText={setDescription}
          textAlignVertical='top'
          placeholder='Please briefly describe your the purpose of the meeting'
          inputStyle={{height: 150}}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Button containerStyle={styles.button} title="Cancel" onPress={onSubmit} />
          <Button containerStyle={styles.button} title="Book" onPress={onCancel} />
        </View>
        {/* <Text>{auth.currentUser.email}</Text>
        <Text>{auth.currentUser.uid}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 30,
    marginHorizontal: 60
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginBottom: 24,
  },
  input: {
    // flex: 1,
    // margin: 10,
    // padding: 10,
    // borderWidth: 1,
  },
  button: {
    width: 100,
  },
});