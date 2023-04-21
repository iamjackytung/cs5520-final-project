import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header as HeaderRNE, Icon, Avatar } from "@rneui/themed";
import { auth, db } from "../Firebase/firebase-setup";
import { doc, onSnapshot } from "firebase/firestore";
import HeaderSettings from "./HeaderSettings";

const Header = (props) => {
  const [isVisible, setIsVisible] = useState(false);
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

    return () => unsubscribe();
  }, []);

  const leftAvatar = () => {
    if (
      route.name === "UserProfile" ||
      route.name === "ClickedProfile" ||
      route.name == "SignUpInfo"
    ) {
      return (
        <Avatar
          size="small"
          rounded
          source={require("../assets/back.png")}
          onPress={() => navigation.goBack()}
        />
      );
    }

    return (
      <Avatar
        size="small"
        rounded
        source={photo ? { uri: photo } : require("../assets/emptyAvatar.png")}
        onPress={() => navigation.navigate("UserProfile")}
      />
    );
  };

  const rightSettings = () => {
    if (route.name === "MyMentors" || route.name === "Calendar Dashboard") {
      return (
        <>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => setIsVisible(true)}
            >
              <Icon type="material" name="settings" color="white" />
            </TouchableOpacity>
        </>
      )
    }
    return <></>;
  }

  return (
    <>
      <HeaderRNE
        leftComponent={leftAvatar()}
        leftContainerStyle={styles.headerLeft}
        rightComponent={rightSettings()}
        rightContainerStyle={styles.headerRight}
        centerComponent={{ text: props.title, style: styles.heading }}
      />
        <HeaderSettings
          style={styles.setting}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
        />
    </>
  );
};

const SubHeader = ({ title, containerStyle, textStyle }) => (
  <View style={[styles.headerContainer, containerStyle]}>
    <Text style={[styles.heading, textStyle]}>{title}</Text>
  </View>
);

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
    justifyContent: "center",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 5,
  },
});

export { Header, SubHeader };
