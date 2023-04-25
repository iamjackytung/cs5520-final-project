import React from "react";
import { StyleSheet, View } from "react-native";
import ListItem from "../ListItem";
import GridItem from "../GridItem";
import { Button, Card, Text } from "@rneui/themed";
import { disconnectWithMentor } from "../../Firebase/firestoreHelper";

const MyMentorsFlatList = ({
  data,
  viewStyle,
  navigation,
  onFindNewMentorsPress,
  myMentors,
  setMyMentors,
}) => {
  const renderEmptyMyMentorsList = () => (
    <Card>
      <Card.Title h4>You have no mentors</Card.Title>
      <Card.Divider />
      <Text style={styles.emptyText}>
        It seems you don't have any mentors yet. Click the button below to
        search for new mentors.
      </Text>
      <Button
        title="Find Mentors"
        onPress={onFindNewMentorsPress}
        containerStyle={styles.findMentorsButton}
      />
    </Card>
  );

  const renderListItem = (item) => (
    <ListItem
      item={item}
      navigation={navigation}
      disconnectButton={true}
      onDisconnect={() => {
        disconnectWithMentor(item.uid);
        setMyMentors(myMentors.filter((mentor) => mentor.uid !== item.uid));
      }}
      key={item.uid}
    />
  );

  const renderGridItem = (item) => (
    <GridItem
      item={item}
      navigation={navigation}
      disconnectButton={true}
      onDisconnect={() => {
        disconnectWithMentor(item.uid);
        setMyMentors(myMentors.filter((mentor) => mentor.uid !== item.uid));
      }}
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
        renderEmptyMyMentorsList()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },

  findMentorsButton: {
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default MyMentorsFlatList;
