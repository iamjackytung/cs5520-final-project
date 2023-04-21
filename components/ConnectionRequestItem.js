import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import { Button } from "react-native-elements";

const ConnectionRequestItem = ({ item, navigation, onAccept, onDeny }) => {
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
          <View style={styles.buttonContainer}>
            <Button
              icon={<Icon name="check" size={20} color="white" />}
              buttonStyle={styles.acceptButton}
              onPress={onAccept}
            />
            <Button
              icon={<Icon name="close" size={20} color="white" />}
              buttonStyle={styles.denyButton}
              onPress={onDeny}
            />
          </View>
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
  buttonContainer: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "green",
    marginRight: 5,
  },
  denyButton: {
    backgroundColor: "red",
  },
});

export default ConnectionRequestItem;
