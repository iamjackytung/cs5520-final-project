import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, lightColors, createTheme, ThemeProvider, Avatar } from '@rneui/themed';
import Home from './screens/Home';
import MyMentors from './screens/MyMentors';

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
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            // screenOptions={{
            //   headerStyle: { backgroundColor: "green" },
            //   headerTintColor: "white",
            //   headerTitleStyle: { fontSize: 30 },
            // }}
          >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyMentors" component={MyMentors} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}


