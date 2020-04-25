import React from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";

const SettingsScreen = () => {
  return (
    <View>
      <Button title="Log Out" onPress={() => firebase.auth().signOut()} />
    </View>
  );
};

export default SettingsScreen;
