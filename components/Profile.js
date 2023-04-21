import React, { Component } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import {
  updateProfilePic,
  getImageFromLibrary,
} from "../Firebase/firestoreHelper";
import { Card, Icon, Overlay } from "react-native-elements";
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Email from "../components/Email";
import Separator from "../components/Separator";
import Tel from "../components/Tel";
import { useState, useEffect } from "react";
import { Button } from "react-native-elements";
import { db, auth } from "../Firebase/firebase-setup";
import { doc, onSnapshot } from "firebase/firestore";

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
  editProfileImageIcon: {
    borderColor: "transparent",
    height: 30,
    borderWidth: 2,
    marginTop: 140,
    marginLeft: 130,
    width: 30,
    borderRadius: 30,
    backgroundColor: "#FFF",
  },
  pressableImage: {
    height: 170,
    width: 170,
    position: "absolute",
  },
  editBackgroundImageIcon: {
    borderColor: "transparent",
    height: 30,
    borderWidth: 2,
    width: 30,
    borderRadius: 30,
    backgroundColor: "#FFF",
  },
  pressableBackground: {
    right: 35,
    top: 15,
    height: 10,
    width: 10,
    position: "absolute",
  },
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
  userNameText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingBottom: 8,
    textAlign: "center",
  },
  bookingButtonContainer: {
    flex: 1,
    paddingHorizontal: 60,
  },
});

const Profile = ({ userData, isUserProfile }) => {
  const navigation = useNavigation();

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
    const [profileVisible, setProfileVisible] = useState(false);
    const [imageProfile, setProfileImage] = useState(null);
    // useEffect(() => {
    //   onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
    //     onChangeprofilePictureUrl(doc.get("profilePictureUrl"));
    //   });
    // }, []);

    const toggleProfileOverlay = () => {
      setProfileVisible(!profileVisible);
    };

    const pickImage = async () => {
      let mediaPermStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
      // console.log(mediaPermStatus);
      if (mediaPermStatus.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.canceled) setProfileImage(result.assets[0].uri);
      } else
        mediaPermStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
    };

    const takePicture = async () => {
      let cameraPermStatus = await ImagePicker.getCameraPermissionsAsync();
      if (cameraPermStatus.granted) {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(result);
        if (!result.canceled) setProfileImage(result.assets[0].uri);
      } else
        cameraPermStatus = await ImagePicker.requestCameraPermissionsAsync();
    };
    return (
      <>
        <Overlay
          isVisible={profileVisible}
          onBackdropPress={toggleProfileOverlay}
        >
          {!imageProfile && (
            <>
              <Button
                title="Pick image from photo library"
                onPress={pickImage}
              />
              <Text> </Text>
              <Button
                title="Take a picture from camera roll"
                onPress={takePicture}
              />
            </>
          )}
          {imageProfile && (
            <>
              <Image
                source={{ uri: imageProfile }}
                style={{ width: 100, height: 100 }}
              />
              <Text> </Text>
              <Button
                title="Confirm Photo?"
                onPress={() => {
                  // onChangeprofilePictureUrl(imageProfile);
                  toggleProfileOverlay();
                  updateProfilePic(imageProfile);
                }}
              />
              <Text> </Text>
              <Button
                title="Choose new photo"
                onPress={() => setProfileImage(null)}
              />
            </>
          )}
        </Overlay>
        <View style={styles.headerContainer}>
          <ImageBackground
            style={styles.headerBackgroundImage}
            blurRadius={10}
            source={{ uri: userData.avatarBackground }}
          >
            <Pressable
              style={styles.pressableBackground}
              onPress={toggleProfileOverlay}
            >
              <Image
                style={styles.editBackgroundImageIcon}
                source={require("../assets/edit-button.png")}
              />
            </Pressable>
            <View style={styles.headerColumn}>
              <Image
                style={styles.userImage}
                source={{ uri: userData.profilePictureUrl }}
              />
              {isUserProfile && (
                <>
                  <Pressable
                    style={styles.pressableImage}
                    onPress={toggleProfileOverlay}
                  >
                    <Image
                      style={styles.editProfileImageIcon}
                      source={require("../assets/edit-button.png")}
                    />
                  </Pressable>
                </>
              )}
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
      </>
    );
  };

  renderTel = () => {
    if (!userData || !userData.tels) {
      return <Text> Loading... </Text>;
    }

    return (
      <View style={styles.telContainer}>
        {userData.tels.map((item, index) => (
          <Tel
            key={`tel-${item.id}`}
            index={index}
            name={item.name}
            number={item.number}
            onPressSms={this.onPressSms}
            onPressTel={this.onPressTel}
          />
        ))}
      </View>
    );
  };

  renderEmail = () => {
    if (!userData || !userData.emails) {
      return <Text> Loading... </Text>;
    }

    return (
      <View style={styles.emailContainer}>
        {userData.emails.map((item, index) => (
          <Email
            key={`email-${item.id}`}
            index={index}
            name={item.name}
            email={item.email}
            onPressEmail={this.onPressEmail}
          />
        ))}
      </View>
    );
  };

  renderBookingButton = () => {
    if (isUserProfile) {
      return <></>;
    }

    if (!userData || !userData.emails) {
      return <Text> Loading... </Text>;
    }

    return (
      <View style={styles.bookingButtonContainer}>
        <Button
          title="Book meeting"
          onPress={() => {
            navigation.navigate("Booking", { attendeeData: userData });
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {this.renderHeader()}
          {this.renderTel()}
          {Separator()}
          {this.renderEmail()}
          {this.renderBookingButton()}
        </Card>
      </View>
    </ScrollView>
  );
};

export default Profile;
