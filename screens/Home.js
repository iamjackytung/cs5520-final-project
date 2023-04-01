import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyMentors from "./MyMentors";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <>
      <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Tab.Screen name="MyMentors" component={MyMentors} />
      </Tab.Navigator>
    </>
  );
}