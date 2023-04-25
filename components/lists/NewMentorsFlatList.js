import React from "react";
import { StyleSheet, View } from "react-native";
import ListItem from "../ListItem";
import GridItem from "../GridItem";
import { Card, Text } from "@rneui/themed";
import { connectWithMentor } from "../../Firebase/firestoreHelper";

const NewMentorsFlatList = ({ data, viewStyle, navigation }) => {
  const renderEmptyNewMentorsList = () => (
    <Card>
      <Card.Title h4>We couldn't match you with new mentors</Card.Title>
      <Card.Divider />
      <Text style={styles.emptyText}>
        We couldn't find any new mentors for you. Please use the search bar to
        connect with new mentors.
      </Text>
    </Card>
  );

  const renderListItem = (item) => (
    <ListItem
      item={item}
      navigation={navigation}
      onConnect={() => {
        connectWithMentor(item.uid);
      }}
      connectButton={true}
      key={item.uid}
    />
  );

  const renderGridItem = (item) => (
    <GridItem
      item={item}
      navigation={navigation}
      onConnect={() => {
        connectWithMentor(item.uid);
      }}
      connectButton={true}
      key={item.uid}
    />
  );

  return (
    <View>
      {data.length > 0 ? (
        <>
          {viewStyle === "list" ? (
            data.map((item) => renderListItem(item))
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {data.map((item) => renderGridItem(item))}
            </View>
          )}
        </>
      ) : (
        renderEmptyNewMentorsList()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },
});

export default NewMentorsFlatList;
