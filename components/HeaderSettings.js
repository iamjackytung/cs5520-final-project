import React, { useState } from "react";
import { BottomSheet, Button, ListItem } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { Icon } from "react-native-elements";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Alert, Text } from "react-native";
import RNRestart from "react-native-restart";

const HeaderSettings = ({ setIsVisible, isVisible }) => {
  const editProfile = () => {
    navigation.navigate("SignUpInfo");
    setIsVisible(false);
  };
  async function logOut() {
    try {
      const auth = getAuth();
      signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  const navigation = useNavigation();
  const list = [
    {
      title: "  Edit Profile",
      icon: "edit",
      onPress: () => editProfile(),
    },
    {
      title: "  Logout",
      icon: "logout",
      onPress: () =>
        Alert.alert("Confirm Logout", "Are you sure you want to Logout?", [
          {
            text: "Yes, Logout",
            onPress: () => logOut(),
          },
          {
            // style: "cancel",
            text: "Cancel",
            onPress: () => console.log("OK Pressed"),
          },
        ]),
    },
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
