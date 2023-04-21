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
import { useRoute } from "@react-navigation/native";

const Header = (props) => {
  const [photo, onChangePhoto] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (doc) => {
        onChangePhoto(doc.get("profilePictureUrl"));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const docsNavigate = () => {
    // Linking.openURL(
    //   `https://reactnativeelements.com/docs/components/${props.view}`
    // );
  };
  const leftAvatar = () => {
    if (route.name == "UserProfile") {
      return (
        <Avatar
          size={"small"}
          rounded
<<<<<<< HEAD
          source={require("../assets/back.png")}
          onPress={() => navigation.goBack()}
=======
          source={require("../assets/emptyAvatar.png")}
          onPress={() => navigation.navigate("UserProfile")}
>>>>>>> 7bfcf1e915e537890edf64d29391c07e7d6ec65c
        />
      );
    } else {
      if (photo == null) {
        return (
          <Avatar
            size={"small"}
            rounded
            source={require("../assets/emptyAvatar.png")}
            onPress={() => navigation.navigate("UserProfile")}
          />
        );
      } else {
        return (
          <Avatar
            size={"small"}
            rounded
            source={{ uri: photo }}
            onPress={() => navigation.navigate("UserProfile")}
          />
        );
      }
    }
<<<<<<< HEAD
=======
    return (
      <Avatar
        size={"small"}
        rounded
        source={{ uri: photo }}
        onPress={() => navigation.navigate("UserProfile")}
      />
    );
>>>>>>> 7bfcf1e915e537890edf64d29391c07e7d6ec65c
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
