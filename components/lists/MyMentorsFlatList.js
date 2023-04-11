import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MentorListItem from "../MentorListItem";
import MentorGridItem from "../MentorGridItem";
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

  const renderMyMentorsListTitle = () => (
    <View>
      <Text style={styles.myMentorsFlatListTitlle}>My current mentors</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={
        viewStyle === "list"
          ? ({ item }) => (
              <MentorListItem
                item={item}
                navigation={navigation}
                disconnectButton={true}
                onDisconnect={() => {
                  disconnectWithMentor(item.uid);
                  setMyMentors(
                    myMentors.filter((mentor) => mentor.uid !== item.uid)
                  );
                }}
              />
            )
          : ({ item }) => (
              <MentorGridItem
                item={item}
                navigation={navigation}
                disconnectButton={true}
                onDisconnect={() => {
                  disconnectWithMentor(item.uid);
                  setMyMentors(
                    myMentors.filter((mentor) => mentor.uid !== item.uid)
                  );
                }}
              />
            )
      }
      keyExtractor={(item) => item.uid}
      numColumns={viewStyle === "list" ? 1 : 2}
      key={viewStyle}
      ListEmptyComponent={renderEmptyMyMentorsList}
    />
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
