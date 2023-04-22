import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ListItem, Avatar, Button } from "@rneui/themed";
import DisconnectButton from "./buttons/DisconnectButton";

const MenteeListItem = ({
  item,
  navigation,
  disconnectButton = false,
  onDisconnect = undefined,
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
        <View style={styles.listItemContent}>
          <ListItem.Content>
            <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
            <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
          </ListItem.Content>
          {disconnectButton && (
            <DisconnectButton title="Disconnect" onPress={onDisconnect} />
          )}
        </View>
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
});

export default MenteeListItem;
