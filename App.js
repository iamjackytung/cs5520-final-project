import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Button,
  lightColors,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@rneui/themed";
import Home from "./screens/Home";
import MyMentors from "./screens/MyMentors";
// import SignUp from "./screens/SignUp";
import SignUpInfo from "./screens/SignUpInfo";
import SignUp from "./screens/SignUp";

// const theme = createTheme({
//   // Colors
//   lightColors: {
//     primary: '#e7e7e8',
//   },
//   darkColors: {
//     primary: '#000',
//   },
//   mode: 'light',
//   // Component styles
//   components: {
//     Button: {
//       raised: true,
//       color: "primary",
//     },
//   },
// });

// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <View>
    //   <SignUpInfo></SignUpInfo>
    // </View>
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              //   headerStyle: { backgroundColor: "green" },
              //   headerTintColor: "white",
              //   headerTitleStyle: { fontSize: 30 },
              //   headerStyle: { backgroundColor: "green" },
              //   headerTintColor: "white",
              //   headerTitleStyle: { fontSize: 30 },
            }}
          >
            <Tab.Screen name="Sign Up" component={SignUp} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="SignUp Info" component={SignUpInfo} />
            <Tab.Screen name="MyMentors" component={MyMentors} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
