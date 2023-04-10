import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

const MentorListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ClickedProfile", {
          userData: item,
        });
      }}
    >
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.profilePictureUrl }} />
        <ListItem.Content>
          <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MentorListItem;
