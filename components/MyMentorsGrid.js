import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

const MyMentorsGrid = ({ item }) => {
  return (
    <TouchableOpacity style={styles.gridItem}>
      <Avatar size="large" source={{ uri: item.profilePictureUrl }} />
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
        <ListItem.Subtitle>{item.jobTitle}</ListItem.Subtitle>
      </ListItem.Content>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});

export default MyMentorsGrid;
