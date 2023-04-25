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
import { Header } from "../components/Header";

const ClickedProfile = ({ route }) => {
  const userData = route.params.userData;
  console.log(userData);
  return (
    <>
      <Header
        view={userData.firstName + "'s Profile"}
        title={userData.firstName + "'s Profile"}
      />
      <Profile userData={userData} isUserProfile={false} />
    </>
  );
};

export default ClickedProfile;
