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
import * as ImagePicker from "expo-image-picker";

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

const SignUpInfo = ({ navigation }) => {
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
      if (!result.canceled) setImage(result.assets[0].uri);
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
      console.log(result);
      if (!result.canceled) setImage(result.assets[0].uri);
    } else cameraPermStatus = await ImagePicker.requestCameraPermissionsAsync();
  };

  const [image, setImage] = useState(null);
  const [firstName, onChangeFirstName] = React.useState(null);
  const [lastName, onChangeLastName] = React.useState(null);
  // const [text, onChangeTag] = React.useState(null);
  const [jobTitle, onChangeJobTitle] = React.useState(null);
  const [isMentee, onChangeIsMentee] = React.useState(false);
  const [isMentor, onChangeIsMentor] = React.useState(false);
  const [profilePictureUrl, onChangeprofilePictureUrl] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [visible, setVisible] = useState(false);
  const [city, OnCityChange] = useState(null);
  const [state, OnStateChange] = useState(null);
  const [country, OnCountryChange] = useState(null);
  const [avatarBackground, OnAvatarBackgroundChange] = useState(null);
  const [telMobile, OnTelMobileChange] = useState(null);
  const [telWork, OnTelWorkChange] = useState(null);
  const [emailPersonal, OnEmailPersonalChange] = useState(null);
  const [emailWork, OnEmailWorkChange] = useState(null);

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
    mentees: ["0BdnUcO91XYNPsx09WktUNSpmDI2", "Azlqq5wRAhaeLy5Vp5ZKdBrfRRB2"],
    mentors: ["0BdnUcO91XYNPsx09WktUNSpmDI2", "Azlqq5wRAhaeLy5Vp5ZKdBrfRRB2"],
    city: city,
    state: state,
    country: country,
    avatarBackground: "https://i.imgur.com/rXVcgTZ.jpg",
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
    // console.log(image),
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
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your City"
            style={InputFieldsStyle}
            onChangeText={OnCityChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your State/Province"
            style={InputFieldsStyle}
            onChangeText={OnStateChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Country"
            style={InputFieldsStyle}
            onChangeText={OnCountryChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Avatar Background"
            style={InputFieldsStyle}
            onChangeText={OnAvatarBackgroundChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Mobile Number"
            style={InputFieldsStyle}
            onChangeText={OnTelMobileChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Work Number"
            style={InputFieldsStyle}
            onChangeText={OnTelWorkChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Personal Email"
            style={InputFieldsStyle}
            onChangeText={OnEmailPersonalChange}
          />
          <Input
            containerStyle={styles.inputContainerStyle}
            // placeholder="Enter Your Job Title"
            label="Your Work Email"
            style={InputFieldsStyle}
            onChangeText={OnEmailWorkChange}
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
