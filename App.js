// App.js
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import {
  ThemeProvider,
} from "@rneui/themed";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import Home from "./screens/Home";
import SignUpInfo from "./screens/SignUpInfo";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile.js";
import ClickedProfile from "./screens/ClickedProfile";
import Booking from "./screens/Booking";
import { PushTokenProvider } from "./contexts/PushTokenContext";

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen name="SignUp" component={SignUp} options={{gestureEnabled: false}} />
    <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
  </>
)
;

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{ gestureEnabled: false }}
    />
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
    <Stack.Screen name="Booking" component={Booking} />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <PushTokenProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            { isAuthenticated? AppStack : AuthStack }
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      </ApplicationProvider>
      </PushTokenProvider>
    </SafeAreaProvider>
  );
}
