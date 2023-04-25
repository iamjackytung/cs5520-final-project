import { Calendar, Agenda, CalendarList } from "react-native-calendars";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import testIDs from "../utils/testIDs";
import { getMeetings } from "../Firebase/firestoreHelper";
import { Header } from "./Header";

export default function CalendarDashboard() {
  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  const [selected, setSelected] = useState(timeToString(Date()));

  const initItems = (month) => {
    const startDate = new Date(month.year, month.month - 1, 1);
    const endDate = new Date(month.year, month.month, 0);
    const items = {};

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      const strTime = timeToString(d);
      items[strTime] = [];
    }
    return items;
  };

  const [items, setItems] = useState(
    initItems({
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    })
  );
  useEffect(() => {
    (async () => {
      const newItems = await getMeetings();
      // console.log(newItems);
      setItems((prevItems) => ({ ...prevItems, ...newItems }));
    })();
  }, []);

  // const loadItems = (day) => {
  //   // const tempItems = items || {};

  //   setTimeout(async () => {
  //     // for (let i = -15; i < 85; i++) {
  //     //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
  //     //   const strTime = timeToString(time);

  //     //   if (!tempItems[strTime]) {
  //     //     tempItems[strTime] = [];

  //     //     const numItems = Math.floor(Math.random() * 3 + 1);
  //     //     for (let j = 0; j < numItems; j++) {
  //     //       tempItems[strTime].push({
  //     //         name: "Item for " + strTime + " #" + j,
  //     //         // height: Math.max(50, Math.floor(Math.random() * 150)),
  //     //         day: strTime,
  //     //       });
  //     //     }
  //     //   }
  //     // }
  //     // newItems = [];
  //     // Object.keys(tempItems).forEach((key) => {
  //     //   newItems[key] = tempItems[key];
  //     // });

  //     // database must consist of json object that includes:
  //     // "day": "2017-05-23"     "day" : "year-month-day"
  //     // "name": "Description"
  //     //  [
  //     //    {"day": "2017-08-12", "name": "Item for 2017-08-12 #0"},
  //     //    {"day": "2017-08-12", "name": "Item for 2017-08-12 #1"}
  //     //  ]
  //     // What we will do is store a single date on both sides, and then the name of the event based on both parties.
  //     // console.log(tempItems);
  //     const newItems = await getMeetings();
  //     console.log(newItems);
  //     setItems(newItems);
  //   }, 1000);
  // };

  // const loadItems = (day) => {
  //   setTimeout(async () => {
  //     const newItems = await getMeetings();

  //     // Create an items object for the current month
  //     const currentMonthItems = initItems({ month: day.month, year: day.year });

  //     // Merge newItems with the currentMonthItems object
  //     const mergedItems = { ...currentMonthItems, ...newItems };

  //     console.log(mergedItems);
  //     setItems(mergedItems);
  //   }, 1000);
  // };

  const renderItem = (reservation, isFirst) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        {/* <Text>No meetings planned</Text> */}
        <Text></Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  // Update this function to change the agenda key whenever the items state changes

  return (
    <>
      <Header view={"My Calendar"} title={"My Calendar"} />
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={items}
        selected={selected}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
        style={[styles.calendarWidth]}
        onDayPress={(day) => {
          if (selected !== day.dateString) {
            setSelected(day.dateString);
          }
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  calendarWidth: {
    width: "100%",
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
