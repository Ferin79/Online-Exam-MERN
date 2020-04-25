import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/auth/SignIn";
import SignUp from "../screens/auth/SignUp";

const AuthStack = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Sign In"
        component={SignIn}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
      <AuthStack.Screen
        name="Sign Up"
        component={SignUp}
        options={{
          headerTitle: "",
          headerTransparent: true
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStack;
