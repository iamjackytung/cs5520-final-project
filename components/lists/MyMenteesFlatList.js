import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListItem from "../ListItem";
import GridItem from "../GridItem";
import { Button, Card, Text } from "@rneui/themed";
import { disconnectWithMentee } from "../../Firebase/firestoreHelper";

const MyMenteesFlatList = ({
  data,
  viewStyle,
  navigation,
  myMentees,
  setMyMentees,
}) => {
  const renderEmptyMyMenteesList = () => (
    <Card>
      <Card.Title h4>You have no mentees</Card.Title>
      <Card.Divider />
      <Text style={styles.emptyText}>It seems you don't have any mentees.</Text>
    </Card>
  );

  const renderMyMenteessListTitle = () => (
    <View>
      <Text style={styles.myMentorsFlatListTitlle}>My mentees</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={
        viewStyle === "list"
          ? ({ item }) => (
              <ListItem
                item={item}
                navigation={navigation}
                disconnectButton={true}
                onDisconnect={() => {
                  disconnectWithMentee(item.uid);
                  setMyMentees(
                    myMentees.filter((mentee) => mentee.uid !== item.uid)
                  );
                }}
              />
            )
          : ({ item }) => (
              <GridItem
                item={item}
                navigation={navigation}
                disconnectButton={true}
                onDisconnect={() => {
                  disconnectWithMentee(item.uid);
                  setMyMentees(
                    myMentees.filter((mentess) => mentee.uid !== item.uid)
                  );
                }}
              />
            )
      }
      keyExtractor={(item) => item.uid}
      numColumns={viewStyle === "list" ? 1 : 2}
      key={viewStyle}
      ListEmptyComponent={renderEmptyMyMenteesList}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },

  findMenteesButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default MyMenteesFlatList;
