import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MentorListItem from "./MentorListItem";
import MentorGridItem from "./MentorGridItem";
import { Button, Card, Text } from "@rneui/themed";

const MentorsFlatList = ({ data, viewStyle, navigation }) => {
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
        onPress={() => navigation.navigate("MentorsSearch")}
        containerStyle={styles.findMentorsButton}
      />
    </Card>
  );
  return (
    <FlatList
      data={data}
      renderItem={
        viewStyle === "list"
          ? ({ item }) => <MentorListItem item={item} navigation={navigation} />
          : ({ item }) => <MentorGridItem item={item} />
      }
      keyExtractor={(item) => item.id}
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

export default MentorsFlatList;
