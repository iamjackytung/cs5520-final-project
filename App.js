// App.js
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "@rneui/themed";
import Home from "./screens/Home";
import SignUpInfo from "./screens/SignUpInfo";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile.js";
import ClickedProfile from "./screens/ClickedProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
            }}
          >
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
            <Stack.Screen name="ClickedProfile" component={ClickedProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
