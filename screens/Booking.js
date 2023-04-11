import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Button, Overlay } from "@rneui/themed";
import { Select, SelectItem } from "@ui-kitten/components";
import { Header } from "../components/Header";
import { Calendar } from "react-native-calendars";
import AddressAutocomplete from "../components/AddressAutocomplete";
import DurationSelect from "../components/DurationSelect";

export default function Booking() {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState("");
  const [profileVisible, setProfileVisible] = useState(false);
  const toggleProfileOverlay = () => {
    setProfileVisible(!profileVisible);
  };
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
          <DurationSelect onSelectDuration={setDuration} />
        </View>
        <View style={styles.inputRow}>
          <Icon
            style={styles.icon}
            size={24}
            name="location-outline"
            type="ionicon"
          />
          <AddressAutocomplete onChangeLocation={setLocation} />
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
