import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ExamScreen from "../screens/exam/ExamScreen";
import ExamConfirmScreen from "../screens/exam/ExamConfirmScreen";
import ExamMain from "../screens/exam/ExamMain";
import ExamResult from "../screens/exam/ExamResult";

const ExamStack = ({ navigation }) => {
  const ExamStackScreen = createStackNavigator();

  return (
    <ExamStackScreen.Navigator>
      <ExamStackScreen.Screen
        name="Exam"
        component={ExamScreen}
        options={{
          headerTitle: "",
          headerTransparent: "true",
        }}
      />
      <ExamStackScreen.Screen
        name="ExamConfirm"
        component={ExamConfirmScreen}
        options={{
          headerTitle: "",
          headerTransparent: "true",
        }}
      />
      <ExamStackScreen.Screen
        name="ExamMain"
        component={ExamMain}
        options={{
          headerTitle: "",
          headerLeft: null,
          headerTransparent: "true",
        }}
      />
      <ExamStackScreen.Screen
        name="ExamResult"
        component={ExamResult}
        options={{
          headerTitle: "",
          headerLeft: null,
          headerTransparent: true,
        }}
      />
    </ExamStackScreen.Navigator>
  );
};

export default ExamStack;
