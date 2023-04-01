import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "@rneui/themed";

const MyMentorsList = ({ item }) => {
  return (
    <TouchableOpacity>
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.profilePictureUrl }} />
        <ListItem.Content>
          <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
          <ListItem.Subtitle>{item.jobTitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MyMentorsList;
