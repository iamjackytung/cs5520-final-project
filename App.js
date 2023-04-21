// App.js
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  lightColors,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@rneui/themed";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import Home from "./screens/Home";
import SignUpInfo from "./screens/SignUpInfo";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile.js";
import ClickedProfile from "./screens/ClickedProfile";
import Booking from "./screens/Booking";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="SignUp" component={SignUp} options={{gestureEnabled: false}} />
            <Stack.Screen name="Home" component={Home} options={{gestureEnabled: false}}/>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
            <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
            <Stack.Screen name="Booking" component={Booking} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
