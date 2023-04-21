import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, ListItem, Button } from "@rneui/themed";
import ConnectButton from "./buttons/ConnectButton";

const MentorGridItem = ({
  item,
  navigation,
  connectButton = false,
  onConnect = undefined,
  disconnectButton = false,
  onDisconnect = undefined,
  cancelRequest = false,
  onCancelRequest = undefined,
}) => {
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
        {cancelRequest && (
          <Button title="Cancel Request" onPress={onCancelRequest} />
        )}
        {connectButton && <ConnectButton title="Connect" onPress={onConnect} />}
        {disconnectButton && (
          <Button title="Disconnect" onPress={onDisconnect} />
        )}
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
