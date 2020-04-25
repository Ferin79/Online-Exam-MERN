import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStackScreen from "./routes/AuthStack";
import BottomNavigation from "./routes/BottomNavigator";
import firebase from "./config/firebase";
import LoadingScreen from "./screens/Loading";
import SafeViewAndroid from "./components/SafeAreaViewAndroid";
import { SafeAreaView } from "react-native";

export default App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkLoginIn = () => {
    setIsLoading(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginIn();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <NavigationContainer>
        {isLogin ? <BottomNavigation /> : <AuthStackScreen />}
      </NavigationContainer>
    </SafeAreaView>
  );
};
