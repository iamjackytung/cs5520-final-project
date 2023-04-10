import React, { useEffect } from "react";
import { Card, Icon } from "react-native-elements";
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Profile from "../components/Profile";
import { useState } from "react";
import { db, auth } from "../Firebase/firebase-setup";
import { doc, onSnapshot } from "firebase/firestore";

const UserProfile = () => {
  const [userData, onChangeUserData] = useState("hello");

  useEffect(() => {
    onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
      onChangeUserData(doc.data());
    });
  }, []);

  return <Profile userData={userData} />;
};

export default UserProfile;
