import { View, Text, StyleSheet } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { auth } from "../Firebase/firebase-setup";
import { Input, Icon, Button, Overlay } from "@rneui/themed";
import DropDownPicker from "react-native-dropdown-picker";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { Header } from "../components/Header";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function Booking() {
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  // const input = useRef();
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [selected, setSelected] = useState("");
  const [profileVisible, setProfileVisible] = useState(false);
  const toggleProfileOverlay = () => {
    setProfileVisible(!profileVisible);
  };

  // function shakeInput() {
  //   input.current.shake();
  // }

  function onSubmit() {}

  function onCancel() {}

  return (
    <View style={styles.container}>
      <Header title="Booking" />
      <View style={styles.content}>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="comment-o"
            type="font-awesome"
          />
          <Input
            // ref={input}
            value={topic}
            onChangeText={setTopic}
            containerStyle={styles.input}
            placeholder="Topic"
          />
        </View>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="calendar-o"
            type="font-awesome"
          />
          <Input
            value={date}
            onChangeText={setDate}
            containerStyle={styles.input}
            placeholder="Date and Time"
          />
        </View>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="clockcircleo"
            type="antdesign"
          />
          {/* <Input
          value={duration}
          onChangeText={setDuration}
          containerStyle={styles.input}
          placeholder='Duration'
          /> */}
          {/* <View style={{flex: 1, zIndex: 100 }}>
            <DropDownPicker
            placeholder="Select duration"
            // containerStyle={{marginBottom: 10}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            />
          </View> */}
          <View style={{ width: "100%" }}>
            <Select
              placeholder="Select duration"
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
            >
              <SelectItem title="15 minutes" />
              <SelectItem title="30 minutes" />
              <SelectItem title="1 hour" />
            </Select>
          </View>
        </View>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="location-outline"
            type="ionicon"
          />
          <Input
            value={location}
            onChangeText={setLocation}
            containerStyle={styles.input}
            placeholder="Location"
          />
        </View>
        <Button
          containerStyle={styles.subHeader}
          title="Book meeting"
          onPress={() => {
            toggleProfileOverlay();
          }}
        />
        <Overlay
          isVisible={profileVisible}
          onBackdropPress={toggleProfileOverlay}
        >
          <Calendar
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
          <Button
            title="Confirm Date?"
            onPress={() => {
              toggleProfileOverlay();
            }}
          />
        </Overlay>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="sticky-note-o"
            type="font-awesome"
          />
          <Input
            multiline
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
            placeholder="Please briefly describe your the purpose of the meeting"
            inputStyle={{ height: 150 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Button
            containerStyle={styles.button}
            title="Cancel"
            onPress={onSubmit}
          />
          <Button
            containerStyle={styles.button}
            title="Book"
            onPress={onCancel}
          />
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
    marginHorizontal: 60,
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
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
    width: "90%",
  },
});
