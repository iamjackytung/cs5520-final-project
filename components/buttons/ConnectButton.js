import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/MaterialIcons";

const ConnectButton = ({ onPress }) => {
  return (
    <Button
      onPress={onPress}
      containerStyle={styles.connectButton}
      buttonStyle={styles.buttonStyle}
      icon={<Icon name="person-add" size={24} color="white" />}
      type="solid"
    />
  );
};

const styles = StyleSheet.create({
  connectButton: {
    width: 50,
    alignSelf: "flex-end",
  },
  buttonStyle: {
    backgroundColor: "green",
    borderRadius: 15,
    height: 50,
    justifyContent: "center",
  },
});

export default ConnectButton;
