import { Button, Icon, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import AddressAutocomplete from "../components/AddressAutocomplete";
import DateTimePickerButtonList from "../components/DateTimePickerButtonList";
import DateTimePickerButtonListAndroid from "../components/DateTimePickerButtonListAndroid";
import { Header } from "../components/Header";
import { addBooking } from "../Firebase/firestoreHelper";

export default function Booking({ route, navigation }) {
  const [topic, setTopic] = useState(`Meeting with ${route.params.attendeeData.firstName} ${route.params.attendeeData.lastName}`);
  const now = new Date();
  const [startDate, setStartDate] = useState(now);
  // Plus 15 minutes
  const [endDate, setEndDate] = useState(new Date(now.getTime() + 15*60000));
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
  }, []);

  async function onSubmit() {
    if (!checkForm()) {
      return;
    }
    const bookingInfo = {
      attendee_ids: [route.params.attendeeData.uid],
      topic,
      start_date: startDate,
      end_date: endDate,
      location,
      description,
    };
    const result = await addBooking(bookingInfo);
    if (result) {
      Alert.alert(
        "Booking successful",
        `You have booked a meeting with ${route.params.attendeeData.firstName} ${route.params.attendeeData.lastName}`,
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert("Booking failed");
    }
  }

  function checkForm() {
    if (topic === "" || location === "" || description === "") {
      Alert.alert("Please fill in all information");
      return false;
    }
    return true;
  }

  function onCancel() {
    navigation.goBack();
  }

  onChangeStartDate = (event, selectedDate) => {
    setStartDate(selectedDate);
    if (selectedDate > endDate) {
      setEndDate(new Date(selectedDate.getTime() + 15*60000));
    }
  };

  onChangeEndDate = (event, selectedDate) => {
    setEndDate(selectedDate);
  };

  return (
    // This dismisses the keyboard when you click outside of the input fields
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

          {Platform.OS === "ios" ? (
            <>
              <View style={styles.inputRow}>
                <DateTimePickerButtonList
                  date={startDate}
                  onChange={onChangeStartDate}
                />
              </View>
              <View style={styles.inputRow}>
                <DateTimePickerButtonList
                  date={endDate}
                  onChange={onChangeEndDate}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.inputRow}>
                <DateTimePickerButtonListAndroid
                  date={startDate}
                  onChange={onChangeStartDate}
                />
              </View>
              <View style={styles.inputRow}>
                <DateTimePickerButtonListAndroid
                  date={endDate}
                  onChange={onChangeEndDate}
                />
              </View>
            </>
          )}

          <View style={styles.inputRow}>
            <Icon
              style={styles.icon}
              size={24}
              name="location-outline"
              type="ionicon"
            />
            <AddressAutocomplete onChangeLocation={setLocation} />
          </View>
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
              onPress={onCancel}
            />
            <Button
              containerStyle={styles.button}
              title="Book"
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
