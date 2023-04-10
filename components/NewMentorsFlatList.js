// NewMentorsFlatList.js
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import MentorListItem from "./MentorListItem";
import MentorGridItem from "./MentorGridItem";
import { Card, Text } from "@rneui/themed";

const NewMentorsFlatList = ({
  data,
  viewStyle,
  renderList,
  renderGridItem,
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
      ListEmptyComponent={renderEmptyNewMentorsList}
    />
  );
};

const styles = StyleSheet.create({
  emptyText: {
    marginBottom: 10,
    textAlign: "center",
  },
});

export default NewMentorsFlatList;
