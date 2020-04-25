import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.mainSheet}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainSheet: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
