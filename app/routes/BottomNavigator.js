import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "../routes/HomeStack";
import ProfileStack from "../routes/ProfileStack";
import ExamStack from "../routes/ExamStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingStack from "./SettingStack";

const BottomNavigator = () => {
  const BottomNavigation = createBottomTabNavigator();

  return (
    <BottomNavigation.Navigator>
      <BottomNavigation.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Exam"
        component={ExamStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <BottomNavigation.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </BottomNavigation.Navigator>
  );
};

export default BottomNavigator;
