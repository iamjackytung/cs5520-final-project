import { View, StyleSheet, Button, Text, Platform } from "react-native";
// import { Input, Icon, Button } from "@rneui/themed";
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Header } from "./Header";


export default DateTimePickerButtonList = ({ date, onChange }) => {
  return (
    <View style={styles.container}>
      {/* <Text>selected: {date.toLocaleString()}</Text> */}
      <DateTimePicker
        value={date}
        mode="date"
        onChange={onChange}
      />
      <DateTimePicker
        value={date}
        mode="time"
        is24Hour={true}
        onChange={onChange}
        minuteInterval={15}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  }
});