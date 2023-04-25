// App.js
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@rneui/themed";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-setup";
import * as Notifications from "expo-notifications";
import Home from "./screens/Home";
import SignUpInfo from "./screens/SignUpInfo";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile.js";
import ClickedProfile from "./screens/ClickedProfile";
import Booking from "./screens/Booking";
import { PushTokenProvider } from "./contexts/PushTokenContext";

// Decide whether to show the notification to user
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const Stack = createNativeStackNavigator();

const AuthStack = (
  <>
    <Stack.Screen
      name="SignUp"
      component={SignUp}
    />
  </>
);
const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
    />
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
    <Stack.Screen name="Booking" component={Booking} />
    <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
  </>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Handle every notification that is received while the app is open
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Received notification", notification);
      }
    );

    // Handle every notification that is tapped on while the app is open
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Interacted notification", response.notification);
        Linking.openURL(response.notification.request.content.data.url);
      });


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log("onAuthStateChanged: ", user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        // console.log("Not authenticated!");
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.remove();
      responseListener.remove();
      unsubscribe();
    };
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
                  gestureEnabled: false
                }}
              >
                {isAuthenticated ? AppStack : AuthStack}
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </ApplicationProvider>
      </PushTokenProvider>
    </SafeAreaProvider>
  );
}
