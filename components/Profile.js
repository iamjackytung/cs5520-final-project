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
import { useState } from "react";
import { db, auth } from "../Firebase/firebase-setup";
import { doc, getDoc } from "firebase/firestore";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFF",
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: "transparent",
    ...Platform.select({
      ios: {
        alignItems: "center",
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: "center",
      },
    }),
  },
  placeIcon: {
    color: "white",
    fontSize: 26,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  telContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  userCityRow: {
    backgroundColor: "transparent",
  },
  userCityText: {
    color: "#A5A5A5",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  userImage: {
    borderColor: "#FFF",
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
});

const Profile = ({ userData }) => {
  onPressPlace = () => {
    console.log("place");
  };

  onPressTel = (number) => {
    Linking.openURL(`tel://${number}`).catch((err) =>
      console.log("Error:", err)
    );
  };

  onPressSms = () => {
    console.log("sms");
  };

  onPressEmail = (email) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(
      (err) => console.log("Error:", err)
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{ uri: userData.avatarBackground }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{ uri: userData.profilePictureUrl }}
            />
            <Text style={styles.userNameText}>
              {userData.firstName + " " + userData.lastName}
            </Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {userData.city}, {userData.country}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  renderTel = () => (
    <FlatList
      contentContainerStyle={styles.telContainer}
      data={userData.tels}
      renderItem={(list) => {
        const { id, name, number } = list.item;
        return (
          <Tel
            key={`tel-${id}`}
            index={list.index}
            name={name}
            number={number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        );
      }}
    />
  );

  renderEmail = () => (
    <FlatList
      contentContainerStyle={styles.emailContainer}
      data={userData.emails}
      renderItem={(list) => {
        const { email, id, name } = list.item;

        return (
          <Email
            key={`email-${id}`}
            index={list.index}
            name={name}
            email={email}
            onPressEmail={this.onPressEmail}
          />
        );
      }}
    />
  );

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {this.renderHeader()}
          {this.renderTel()}
          {Separator()}
          {this.renderEmail()}
        </Card>
      </View>
    </ScrollView>
  );
};

export default Profile;
