import React, { useState } from "react";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const HeaderSettings = ({ setIsVisible, isVisible }) => {
  const editProfile = () => {
    navigation.navigate("SignUpInfo");
    setIsVisible(false);
  };
  const navigation = useNavigation();
  const list = [
    {
      title: "  Edit Profile",
      icon: "edit",
      onPress: () => editProfile(),
    },
    { title: "  Logout", icon: "logout", onPress: () => setIsVisible(false) },
    {
      title: "  Cancel",
      icon: "cancel",
      iconColor: "white",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <BottomSheet modalProps={{}} isVisible={isVisible}>
      {list.map((l, i) => (
        <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "flex-start" }}
          >
            <Icon type="material" name={l.icon} color={l.iconColor} />
            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

export default HeaderSettings;
