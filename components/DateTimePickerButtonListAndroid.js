import { View, StyleSheet, Text, Platform } from "react-native";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Header } from "./Header";


export default DateTimePickerButtonListAndroid = ({ date, onChange }) => {
  let dateOptions = { year: 'numeric', month: 'short', day: 'numeric'};
  const [dateString, setdateString] = useState(date.toLocaleDateString("en-US", dateOptions));

  let timeOptions = { hour: 'numeric', minute: 'numeric'}
  const [timeString, settimeString] = useState(date.toLocaleTimeString("en-US", timeOptions));

  function onChangeInternal(event, selectedDate) {
    if (event.type === "dismissed") {
      return;
    }
    if (event.type === "set") {
      onChange(event, selectedDate);
      setdateString(selectedDate.toLocaleDateString("en-US", dateOptions));
      settimeString(selectedDate.toLocaleTimeString("en-US", timeOptions));
    }
  }

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeInternal,
      mode: currentMode,
      is24Hour: true,
      minuteInterval: 15
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <Button containerStyle={styles.button} onPress={showDatepicker} title={dateString} />
      <Button containerStyle={styles.button} onPress={showTimepicker} title={timeString} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    paddingHorizontal: 10
  }

});