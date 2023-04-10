import React, { Component } from "react";
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
import PropTypes from "prop-types";
import Email from "../components/Email";
import Separator from "../components/Separator";
import Tel from "../components/Tel";
import Profile from "../components/Profile";
import { useState } from "react";
import { db, auth } from "../Firebase/firebase-setup";
import { doc, getDoc } from "firebase/firestore";

const UserProfile = () => {
  const [userData, onChangeUserData] = useState("hello");

  const getUserData = async () => {
    let docRef = doc(db, "users", auth.currentUser.uid);
    let docSnap = await getDoc(docRef);
    onChangeUserData(docSnap.data());
  };
  getUserData();

  return <Profile userData={userData} />;
};

export default UserProfile;
