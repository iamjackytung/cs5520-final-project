import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header as HeaderRNE, HeaderProps, Icon, Avatar } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../Firebase/firebase-setup";
// import { collection } from "firebase/firestore";
// import { onValue, ref } from "firebase/database";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const Header = (props) => {
  const [photo, onChangePhoto] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      onChangePhoto(doc.get("profilePictureUrl"));
    });
  }, []);

  const docsNavigate = () => {
    // Linking.openURL(
    //   `https://reactnativeelements.com/docs/components/${props.view}`
    // );
  };
  const leftAvatar = () => {
    if (photo == null) {
      return (
        <Avatar
          size={"small"}
          rounded
          source={require("../assets/emptyAvatar.png")}
          onPress={() => navigation.navigate("SignUpInfo")}
        />
      );
    }
    return (
      <Avatar
        size={"small"}
        rounded
        source={{ uri: photo }}
        onPress={() => navigation.navigate("SignUpInfo")}
      />
    );
  };

  const playgroundNavigate = () => {
    // Linking.openURL(`https://react-native-elements.js.org/#/${props.view}`);
  };
  return (
    <HeaderRNE
      // leftComponent={{
      //   icon: 'menu',
      //   color: '#fff',
      //   onPress: navigation.openDrawer,
      // }}
      leftComponent={leftAvatar()}
      leftContainerStyle={styles.headerLeft}
      rightComponent={
        <>
          <TouchableOpacity onPress={docsNavigate}>
            <Icon name="description" color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={playgroundNavigate}
          >
            <Icon type="antdesign" name="rocket1" color="white" />
          </TouchableOpacity>
        </>
      }
      rightContainerStyle={styles.headerRight}
      centerComponent={{ text: props.title, style: styles.heading }}
    />
  );
};

const SubHeader = ({ title, containerStyle, textStyle }) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={[styles.heading, textStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#397af8",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 5,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 5,
  },
  subheaderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export { Header, SubHeader };
