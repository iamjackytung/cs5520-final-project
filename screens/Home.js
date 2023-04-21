import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyMentorsScreen from "./MyMentorsScreen";
import UserProfile from "./UserProfile";
import { StyleSheet } from "react-native";
import CalendarDashboard from "../components/CalendarDashboard";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="MyMentors" component={MyMentorsScreen} />
        {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
        <Tab.Screen name="Calendar Dashboard" component={CalendarDashboard} />
      </Tab.Navigator>
    </>
  );
}
