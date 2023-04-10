import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MentorListItem from "./MentorListItem";
import MentorGridItem from "./MentorGridItem";
import { Card, Text } from "@rneui/themed";
import { connectWithMentor } from "../Firebase/firestoreHelper";

const NewMentorsFlatList = ({
  data,
  viewStyle,
  navigation,
  myMentors,
  newMentors,
  setMyMentors,
  setNewMentors,
}) => {
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

  const renderNewMentorsListTitle = () => (
    <View>
      <Text style={styles.renderNewMentorsListTitle}>
        Connect with new mentors
      </Text>
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
                onConnect={() => {
                  connectWithMentor(item.uid);
                  setMyMentors([...myMentors, item]);
                  setNewMentors(
                    newMentors.filter((mentor) => mentor.uid !== item.uid)
                  );
                }}
                connectButton={true}
              />
            )
          : ({ item }) => (
              <MentorGridItem
                item={item}
                navigation={navigation}
                onConnect={() => {
                  connectWithMentor(item.uid);
                  setMyMentors([...myMentors, item]);
                  setNewMentors(
                    newMentors.filter((mentor) => mentor.uid !== item.uid)
                  );
                }}
                connectButton={true}
              />
            )
      }
      keyExtractor={(item) => item.uid}
      numColumns={viewStyle === "list" ? 1 : 2}
      key={viewStyle}
      ListEmptyComponent={renderEmptyNewMentorsList}
      ListHeaderComponent={renderNewMentorsListTitle}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },

  renderNewMentorsListTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default NewMentorsFlatList;
