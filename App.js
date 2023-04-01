import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Button,
  lightColors,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@rneui/themed";
import Home from "./screens/Home";
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

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    // <View>
    //   <SignUpInfo></SignUpInfo>
    // </View>
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
        </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
