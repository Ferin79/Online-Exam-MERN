import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import ClassList from "../screens/Home/ClassList";
import ChapterList from "../screens/Home/ChapterList";
import Video from "../screens/Home/Video";

const HomeStack = () => {
  const HomeStackScreen = createStackNavigator();
  return (
    <HomeStackScreen.Navigator>
      <HomeStackScreen.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "", headerTransparent: "true" }}
      />
      <HomeStackScreen.Screen
        name="ClassList"
        component={ClassList}
        options={{ headerTitle: "Select Class", headerTransparent: "true" }}
      />
      <HomeStackScreen.Screen
        name="ChapterList"
        component={ChapterList}
        options={{ headerTitle: "Select Chapter", headerTransparent: "true" }}
      />

      <HomeStackScreen.Screen
        name="VideoPlayer"
        component={Video}
        options={{ headerTitle: "Video Player", headerTransparent: "true" }}
      />
    </HomeStackScreen.Navigator>
  );
};
export default HomeStack;
