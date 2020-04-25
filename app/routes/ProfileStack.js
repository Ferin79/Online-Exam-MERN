import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import ResultList from "../screens/Profile/ResultList";
import Solution from "../screens/Profile/Solution";

const ProfileStack = () => {
  const ProfileStackScreen = createStackNavigator();
  return (
    <ProfileStackScreen.Navigator>
      <ProfileStackScreen.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "", headerTransparent: "true" }}
      />
      <ProfileStackScreen.Screen
        name="ResultList"
        component={ResultList}
        options={{ headerTitle: "Result List" }}
      />
      <ProfileStackScreen.Screen
        name="Solution"
        component={Solution}
        options={{ headerTitle: "Solution" }}
      />
    </ProfileStackScreen.Navigator>
  );
};

export default ProfileStack;
