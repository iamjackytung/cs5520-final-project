import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Dimensions,
} from "react-native";
import { Header } from "../components/Header";
import { Input, Icon, Button, Overlay } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { writeToDB } from "../Firebase/firestoreHelper";
import * as ImagePicker from "expo-image-picker";
import { db, auth } from "../Firebase/firebase-setup";
import { FieldPath, doc, onSnapshot } from "firebase/firestore";

const USER_MENTOR = require("../assets/mentor.png");
const USER_MENTEE = require("../assets/mentee.png");
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export const UserTypeItem = (props) => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const SignUpInfo = ({ route, navigation }) => {
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
      mediaPermStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  };
  const takePicture = async () => {
    let cameraPermStatus = await ImagePicker.getCameraPermissionsAsync();
    if (cameraPermStatus.granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      // console.log(result);
      if (!result.canceled) setProfileImage(result.assets[0].uri);
    } else cameraPermStatus = await ImagePicker.requestCameraPermissionsAsync();
  };
  const pickBackgroundImage = async () => {
    let mediaPermStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
    // console.log(mediaPermStatus);
    if (mediaPermStatus.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) setBackgroundImage(result.assets[0].uri);
    } else
      mediaPermStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  };

  const [imageProfile, setProfileImage] = useState(null);
  const [imageBackground, setBackgroundImage] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [profileVisible, setProfileVisible] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [firstName, onChangeFirstName] = useState(null);
  const [lastName, onChangeLastName] = useState(null);
  const [jobTitle, onChangeJobTitle] = useState(null);
  const [isMentee, onChangeIsMentee] = useState(false);
  const [isMentor, onChangeIsMentor] = useState(false);
  const [profilePictureUrl, onChangeprofilePictureUrl] = useState(null);
  const [backgroundImageUrl, onChangebackgroundImageUrl] = useState(null);
  const [city, OnCityChange] = useState(null);
  const [state, OnStateChange] = useState(null);
  const [country, OnCountryChange] = useState(null);
  const [telMobile, OnTelMobileChange] = useState("");
  const [telWork, OnTelWorkChange] = useState("");
  const [emailPersonal, OnEmailPersonalChange] = useState(null);
  const [emailWork, OnEmailWorkChange] = useState(null);
  const signingUp = true;

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "users", auth.currentUser.uid),
      (doc) => {
        if (!doc || !doc.data()) { return; }
        // The user is signing up for the first time, only has token field
        // console.log("doc: ", doc);
        // console.log("doc data: ", doc.data());
        if (Object.keys(doc.data()).length == 1 && doc.get("token")) {
          return;
        } else {
          signingUp == false;
          onChangeFirstName(doc.get("firstName"));
          onChangeIsMentee(doc.get("isMentee"));
          onChangeIsMentor(doc.get("isMentor"));
          onChangeJobTitle(doc.get("jobTitle"));
          onChangeLastName(doc.get("lastName"));
          onChangebackgroundImageUrl(doc.get("profilePictureUrl"));
          onChangeprofilePictureUrl(doc.get("profilePictureUrl"));
          OnCityChange(doc.get("city"));
          OnStateChange(doc.get("state"));
          OnCountryChange(doc.get("country"));
          OnTelMobileChange(doc.get("tels")[0]["number"]);
          OnTelWorkChange(doc.get("tels")[1]["number"]);
          OnEmailPersonalChange(doc.get("emails")[0]["email"]);
          OnEmailWorkChange(doc.get("emails")[1]["email"]);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const toggleProfileOverlay = () => {
    setProfileVisible(!profileVisible);
  };
  const toggleBackgroundOverlay = () => {
    setBackgroundVisible(!backgroundVisible);
  };

  const userData = {
    uid: auth.currentUser.uid,
    firstName: firstName,
    lastName: lastName,
    jobTitle: jobTitle,
    isMentee: isMentee,
    isMentor: isMentor,
    profilePictureUrl: profilePictureUrl,
    mentees: ["UWvEZnpTfse1NCjIO5WXPxv8Kyq2", "iNUpk5exXpZWzBXLpRyU4oJONuX2"],
    mentors: ["iNUpk5exXpZWzBXLpRyU4oJONuX2", "UWvEZnpTfse1NCjIO5WXPxv8Kyq2"],
    city: city,
    state: state,
    country: country,
    avatarBackground: backgroundImageUrl,
    tels: [
      { id: 1, name: "Mobile", number: telMobile },
      { id: 2, name: "Work", number: telWork },
    ],
    emails: [
      { id: 1, name: "Personal", email: emailPersonal },
      { id: 2, name: "Work", email: emailWork },
    ],
  };

  const selectedTypeHandler = (value) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedType(value);
    if (value == "mentor") {
      onChangeIsMentor(true);
      onChangeIsMentee(false);
    }
    if (value == "mentee") {
      onChangeIsMentor(false);
      onChangeIsMentee(true);
    }
  };

  const InputFieldsStyle = {
    borderWidth: 0,
  };
  // console.log("SignUp page has " + auth.currentUser.uid);

  return (
    <>
      <Header view="Submit" title={ route.params ? route.params.headerTitle : "Sign Up"} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View style={styles.formContainer}>
            <Text>Please click which option best describes you</Text>
            <Text>{}</Text>
            <View style={styles.userTypesContainer}>
              <UserTypeItem
                label="Mentor"
                labelColor="blue"
                image={USER_MENTOR}
                onPress={() => selectedTypeHandler("mentor")}
                selected={selectedType === "mentor"}
              />
              <UserTypeItem
                label="Mentee"
                labelColor="blue"
                image={USER_MENTEE}
                onPress={() => selectedTypeHandler("mentee")}
                selected={selectedType === "mentee"}
              />
            </View>
          </View>
          <Input
            containerStyle={{ width: "90%" }}
            placeholder={firstName}
            label="First Name"
            labelStyle={{ marginTop: 16 }}
            style={InputFieldsStyle}
            onChangeText={onChangeFirstName}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={lastName}
            label="Last Name"
            style={InputFieldsStyle}
            onChangeText={onChangeLastName}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={jobTitle}
            label="Job Title"
            style={InputFieldsStyle}
            onChangeText={onChangeJobTitle}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={city}
            label="Your City"
            style={InputFieldsStyle}
            onChangeText={OnCityChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={state}
            label="Your State/Province"
            style={InputFieldsStyle}
            onChangeText={OnStateChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={country}
            label="Your Country"
            style={InputFieldsStyle}
            onChangeText={OnCountryChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            label="Your Home Number"
            placeholder={telMobile.toString()}
            style={InputFieldsStyle}
            onChangeText={OnTelMobileChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={telWork.toString()}
            label="Your Work Number"
            style={InputFieldsStyle}
            onChangeText={OnTelWorkChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={emailPersonal}
            label="Your Personal Email"
            style={InputFieldsStyle}
            onChangeText={OnEmailPersonalChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            placeholder={emailWork}
            label="Your Work Email"
            style={InputFieldsStyle}
            onChangeText={OnEmailWorkChange}
          />
          {signingUp && (
            <>
              <Button
                title="Set up Profile Picture"
                onPress={toggleProfileOverlay}
                buttonStyle={styles.button}
              />
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
                        onChangeprofilePictureUrl(imageProfile);
                        toggleProfileOverlay();
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
              <Button
                title="Set up Avatar Background"
                onPress={toggleBackgroundOverlay}
                buttonStyle={styles.button}
              />
              <Overlay
                isVisible={backgroundVisible}
                onBackdropPress={toggleBackgroundOverlay}
              >
                {!imageBackground && (
                  <>
                    <Button
                      title="Pick image from photo library"
                      onPress={pickBackgroundImage}
                    />
                    <Text> </Text>
                    <Button
                      title="Take a picture from camera roll"
                      onPress={takePicture}
                    />
                  </>
                )}
                {imageBackground && (
                  <>
                    <Image
                      source={{ uri: imageBackground }}
                      style={{ width: 100, height: 100 }}
                    />
                    <Text> </Text>
                    <Button
                      title="Confirm Photo?"
                      onPress={() => {
                        onChangebackgroundImageUrl(imageBackground);
                        toggleBackgroundOverlay();
                      }}
                    />
                    <Text> </Text>
                    <Button
                      title="Choose new photo"
                      onPress={() => setBackgroundImage(null)}
                    />
                  </>
                )}
              </Overlay>
            </>
          )}

          <Button
            title="Submit"
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(90, 154, 230, 1)",
              borderColor: "transparent",
              borderWidth: 0,
            }}
            radius={30}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => {
              writeToDB(userData);
              navigation.navigate("Home");
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default SignUpInfo;

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 16,
    width: "90%",
  },
  userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "white",
    // width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 10,
    alignItems: "center",
  },
  userTypeItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: "yellow",
    // fontFamily: "UbuntuBold",
    fontSize: 12,
  },
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
