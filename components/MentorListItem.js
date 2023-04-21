import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ListItem, Avatar, Button } from "@rneui/themed";
import ConnectButton from "./buttons/ConnectButton";
import DisconnectButton from "./buttons/DisconnectButton";

const MentorListItem = ({
  item,
  navigation,
  connectButton = false,
  onConnect = undefined,
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
            {/* add (pending connection) to the title if item.outboundRequest === true */}
            {item.outboundRequest && (
              <ListItem.Title>(pending connection)</ListItem.Title>
            )}
            <ListItem.Subtitle>{`${item.jobTitle}`}</ListItem.Subtitle>
          </ListItem.Content>
          {connectButton && (
            <ConnectButton title="Connect" onPress={onConnect} />
          )}
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

export default MentorListItem;
