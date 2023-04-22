import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyMentorsScreen from "./MyMentorsScreen";
import MyMenteesScreen from "./MyMenteesScreen";
import UserProfile from "./UserProfile";
import { StyleSheet } from "react-native";
import CalendarDashboard from "../components/CalendarDashboard";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { userIsMentor, userIsMentee } from "../Firebase/firestoreHelper";

const Tab = createBottomTabNavigator();

export default function Home() {
  const [isMentor, setIsMentor] = useState(false);
  const [isMentee, setIsMentee] = useState(false);
  useEffect(() => {
    userIsMentor().then((isMentor) => {
      setIsMentor(isMentor);
    });
    userIsMentee().then((isMentee) => {
      setIsMentee(isMentee);
    });
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isMentee && (
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
        )}
        {isMentor && (
          <Tab.Screen
            name="MyMentees"
            component={MyMenteesScreen}
            options={{
              tabBarLabel: "My Mentees",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="user-graduate" color={color} size={size} />
              ),
            }}
          />
        )}
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
