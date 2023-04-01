import { useEffect } from "react";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

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
import { auth } from "../Firebase/firebase-setup";
import React, { useState } from "react";
import { writeToDB } from "../Firebase/firestoreHelper";

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

const SignUpInfo = () => {
  ////////////////////////////////////////////////////////////////////////////////////
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  ////////////////////////////////////////////////////////
  const takePicture = async () => {
    // const { status } = await ImagePicker.getCameraPermissionsAsync;
    // if (status == "granted") {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    // } else Alert.alert("Permission not Granted");
  };

  ////////////////////////////////////////////////////////
  const [image, setImage] = useState(null);

  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  // const [text, onChangeTag] = React.useState(null);
  const [jobTitle, onChangeJobTitle] = React.useState(null);
  const [isMentee, onChangeIsMentee] = React.useState(false);
  const [isMentor, onChangeIsMentor] = React.useState(false);
  const [profilePictureUrl, onChangeprofilePictureUrl] = React.useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const userData = {
    uid: auth.currentUser.uid,
    firstName: firstName,
    lastName: lastName,
    jobTitle: jobTitle,
    isMentee: isMentee,
    isMentor: isMentor,
    profilePictureUrl: profilePictureUrl,
    mentees: {},
    mentors: {},
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
    console.log(image),
    (
      <>
        <Header view="Submit" title="My mentors" />
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
              // placeholder="First Name"
              label="First Name"
              labelStyle={{ marginTop: 16 }}
              style={InputFieldsStyle}
              onChangeText={onChangeFirstName}
            />
            <Input
              containerStyle={styles.inputContainerStyle}
              // placeholder="Last Name"
              label="Last Name"
              style={InputFieldsStyle}
              onChangeText={onChangeLastName}
            />
            <Input
              containerStyle={styles.inputContainerStyle}
              // placeholder="Enter Your Job Title"
              label="Job Title"
              style={InputFieldsStyle}
              onChangeText={onChangeJobTitle}
            />
            <Button
              title="Set up Profile Picture"
              onPress={toggleOverlay}
              buttonStyle={styles.button}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
              {!image && (
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
              {image && (
                <>
                  <Image
                    source={{ uri: image }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text> </Text>
                  <Button
                    title="Confirm Photo?"
                    onPress={() => {
                      onChangeprofilePictureUrl(image);
                      toggleOverlay();
                    }}
                  />
                  <Text> </Text>
                  <Button
                    title="Choose new photo"
                    onPress={() => setImage(null)}
                  />
                </>
              )}
            </Overlay>

            <Button
              title="Submit"
              // icon={{
              //   name: "Submit",
              //   type: "font-awesome",
              //   size: 15,
              //   color: "white",
              // }}
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
              onPress={() => writeToDB(userData)}
            />
          </View>
        </ScrollView>
      </>
    )
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
