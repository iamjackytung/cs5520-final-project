import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem, Avatar, Button } from "@rneui/themed";

const MentorListItem = ({
  item,
  navigation,
  connectButton = false,
  disconnectButton = false,
}) => {
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
          {connectButton && (
            <Button
              title="Connect"
              onPress={() => connectWithMentor(item.uid)}
            />
          )}
          {disconnectButton && (
            <Button
              title="Disconnect"
              onPress={() => disconnectWithMentor(item.uid)}
            />
          )}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default MentorListItem;
