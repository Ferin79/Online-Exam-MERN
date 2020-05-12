import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingScreen from "../screens/Settings/SettingsScreen";

const SettingStack = () => {
  const SettingStackScreen = createStackNavigator();

  return (
    <SettingStackScreen.Navigator>
      <SettingStackScreen.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
        }}
      />
    </SettingStackScreen.Navigator>
  );
};

export default SettingStack;
