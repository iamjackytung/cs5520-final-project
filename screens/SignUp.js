import React, { useState, useRef } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Icon, InputProps } from "@rneui/themed";
import {
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase/firebase-setup";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("../assets/loginSignUpBackground.jpg");
const USER_MENTOR = require("../assets/mentor.png");
const USER_MENTEE = require("../assets/mentee.png");

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimatironEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const TabSelector = ({ selected }) => {
  return (
    <View style={styles.selectorContainer}>
      <View style={selected && styles.selected} />
    </View>
  );
};

// type UserTypeItemType = {
//   image: ImageSourcePropType,
//   label?: string,
//   labelColor?: string,
//   selected?: boolean,
//   onPress?: () => void,
// };

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

const SignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const emailInput = useRef();
  const passwordInput = useRef();
  const confirmationInput = useRef();

  const isLoginPage = selectedCategory === 0;
  const isSignUpPage = selectedCategory === 1;

  const selectCategory = (selectedCategoryIndex) => {
    LayoutAnimation.easeInEaseOut();
    setLoading(false);
    setSelectedCategory(selectedCategoryIndex);
  };

  const selectedTypeHandler = (value) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedType(value);
  };

  const validateEmail = (testEmail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(testEmail);
  };

  const signUpHandler = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Successfully created account");
        const user = userCredential.user;
        //////////////////////////////////////////////////////////////////
        console.log("user id is " + user.uid);
        console.log("User account created & signed in!");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use")
          Alert.alert("Email address already in use!");
        else if (err.code === "auth/invalid-email")
          Alert.alert("Email address invalid!");
        else Alert.alert("Unknown Error: " + err.code);
        // console.error(err);
      });
  };

  const loginHandler = async () => {
    console.log("user id was " + auth.currentUser.uid);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert("Successfully Logged In");
        const user = userCredential.user;
        ////////////////////////////////////////////////////////////////////////
        console.log("user id currently " + user.uid);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") Alert.alert("User not Found");
        else if (err.code === "auth/wrong-password")
          Alert.alert("Invalid Password");
        else Alert.alert("Unkown error: " + err.code);
        // console.log(err.message);
      });
  };

  const login = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      const isEmailValidFlag =
        validateEmail(email) || emailInput.current.shake();
      const isPasswordValidFlag =
        password.length >= 8 || passwordInput.current.shake();

      LayoutAnimation.easeInEaseOut();
      setLoading(false);
      setEmailValid(isEmailValidFlag);
      setPasswordValid(isPasswordValidFlag);
      if (isEmailValidFlag && isPasswordValidFlag) loginHandler();
    }, 1500);
  };

  const signUp = () => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      const isEmailValidFlag =
        validateEmail(email) || emailInput.current.shake();
      const isPasswordValidFlag =
        password.length >= 8 || passwordInput.current.shake();
      const isConfirmPasswordValidFlag =
        password === confirmPassword || confirmationInput.current.shake();

      LayoutAnimation.easeInEaseOut();
      setLoading(false);
      setEmailValid(validateEmail(email) || emailInput.current.shake());
      setPasswordValid(password.length >= 8 || passwordInput.current.shake());
      setConfirmPasswordValid(
        password === confirmPassword || confirmationInput.current.shake()
      );
      if (
        isEmailValidFlag &&
        isPasswordValidFlag &&
        isConfirmPasswordValidFlag
      ) {
        signUpHandler();
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        <View>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>Welcome to</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.titleText}>NEUCareer!</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              disabled={isLoading}
              type="clear"
              activeOpacity={0.7}
              onPress={() => selectCategory(0)}
              containerStyle={{ flex: 1 }}
              titleStyle={[
                styles.categoryText,
                isLoginPage && styles.selectedCategoryText,
              ]}
              title="Login"
            />
            <Button
              disabled={isLoading}
              type="clear"
              activeOpacity={0.7}
              onPress={() => selectCategory(1)}
              containerStyle={{ flex: 1 }}
              titleStyle={[
                styles.categoryText,
                isSignUpPage && styles.selectedCategoryText,
              ]}
              title="Sign up"
            />
          </View>
          <View style={styles.rowSelector}>
            <TabSelector selected={isLoginPage} />
            <TabSelector selected={isSignUpPage} />
          </View>
          <View style={styles.formContainer}>
            {isSignUpPage && (
              <>
                <Text>Please click which option best describes you</Text>
                <Text>{}</Text>
                <View style={styles.userTypesContainer}>
                  <UserTypeItem
                    label="Mentor"
                    labelColor="blue"
                    image={USER_MENTOR}
                    onPress={() => selectedTypeHandler("parent")}
                    selected={selectedType === "parent"}
                  />
                  <UserTypeItem
                    label="Mentee"
                    labelColor="blue"
                    image={USER_MENTEE}
                    onPress={() => selectedTypeHandler("child")}
                    selected={selectedType === "child"}
                  />
                </View>
              </>
            )}
            <Input
              leftIcon={
                <Icon
                  name="envelope-o"
                  type="font-awesome"
                  color="rgba(0, 0, 0, 0.38)"
                  size={25}
                  style={{ backgroundColor: "transparent" }}
                />
              }
              value={email}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              inputStyle={{ marginLeft: 10, color: "grey" }}
              placeholder={"Email"}
              containerStyle={{
                borderBottomColor: "rgba(0, 0, 0, 0.38)",
              }}
              ref={emailInput}
              onSubmitEditing={() => passwordInput.current.focus()}
              onChangeText={(text) => setEmail(text)}
              errorMessage={
                isEmailValid ? "" : "Please enter a valid email address"
              }
            />
            <Input
              leftIcon={
                <Icon
                  name="lock"
                  type="simple-line-icon"
                  color="rgba(0, 0, 0, 0.38)"
                  size={25}
                  style={{ backgroundColor: "transparent" }}
                />
              }
              value={password}
              keyboardAppearance="light"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              returnKeyType={isSignUpPage ? "next" : "done"}
              blurOnSubmit={true}
              containerStyle={{
                marginTop: 16,
                borderBottomColor: "rgba(0, 0, 0, 0.38)",
              }}
              inputStyle={{ marginLeft: 10, color: "grey" }}
              placeholder={"Password"}
              ref={passwordInput}
              onSubmitEditing={() => {
                isSignUpPage ? confirmationInput.current.focus() : login();
              }}
              onChangeText={(text) => setPassword(text)}
              errorMessage={
                isPasswordValid ? "" : "Please enter at least 8 characters"
              }
            />
            {isSignUpPage && (
              <Input
                leftIcon={
                  <Icon
                    name="lock"
                    type="simple-line-icon"
                    color="rgba(0, 0, 0, 0.38)"
                    size={25}
                    style={{ backgroundColor: "transparent" }}
                  />
                }
                value={confirmPassword}
                secureTextEntry={true}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType={"done"}
                blurOnSubmit={true}
                containerStyle={{
                  marginTop: 16,
                  borderBottomColor: "rgba(0, 0, 0, 0.38)",
                }}
                inputStyle={{ marginLeft: 10, color: "grey" }}
                placeholder={"Confirm password"}
                ref={confirmationInput}
                onSubmitEditing={signUp}
                onChangeText={(text) => setConfirmPassword(text)}
                errorMessage={
                  isConfirmPasswordValid ? "" : "Please enter the same password"
                }
              />
            )}
            <Button
              buttonStyle={styles.loginButton}
              containerStyle={{ marginTop: 32, flex: 0 }}
              activeOpacity={0.8}
              title={isLoginPage ? "LOGIN" : "SIGN UP"}
              onPress={isLoginPage ? login : signUp}
              titleStyle={styles.loginTextButton}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
          <View style={styles.helpContainer}>
            <Button
              title={"Need help ?"}
              titleStyle={{ color: "white" }}
              buttonStyle={{ backgroundColor: "transparent" }}
              onPress={() => Alert.alert("🤔", "Forgot Password Route")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 20,
    width: "100%",
    height: SCREEN_HEIGHT,
    alignItems: "center",
    justifyContent: "space-around",
  },
  rowSelector: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  selectorContainer: {
    flex: 1,
    alignItems: "center",
  },
  selected: {
    position: "absolute",
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: "white",
    backgroundColor: "white",
  },
  loginTextButton: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "rgba(232, 147, 142, 1)",
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    // fontFamily: "light",
    backgroundColor: "transparent",
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: "white",
    fontSize: 30,
    // fontFamily: "regular",
    textAlign: "center",
  },
  helpContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  userTypesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
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
    fontSize: 11,
  },
});

export default SignUp;
