import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyMentorsScreen from "./MyMentorsScreen";
import UserProfile from "./UserProfile";

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
        <Tab.Screen name="UserProfile" component={UserProfile} />
      </Tab.Navigator>
    </>
  );
}
