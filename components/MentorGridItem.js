import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, ListItem } from "@rneui/themed";

const MentorGridItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        navigation.navigate("ClickedProfile", {
          userData: item,
        });
      }}
    >
      <Avatar size="large" source={{ uri: item.profilePictureUrl }} />
      <ListItem.Content>
        <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
        <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
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

export default MentorGridItem;
