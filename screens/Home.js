import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyMentorsScreen from "./MyMentorsScreen";
import UserProfile from "./UserProfile";
import { StyleSheet } from "react-native";
import CalendarDashboard from "../components/CalendarDashboard";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="MyMentors"
          component={MyMentorsScreen}
          options={{
            tabBarLabel: "Mentorship",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5
                name="chalkboard-teacher"
                color={color}
                size={size}
              />
            ),
          }}
        />
        {/* <Tab.Screen name="UserProfile" component={UserProfile} /> */}
        <Tab.Screen
          name="Calendar Dashboard"
          component={CalendarDashboard}
          options={{
            tabBarLabel: "My Calendar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
