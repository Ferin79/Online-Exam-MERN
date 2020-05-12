import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.mainSheet}>
      {/* <ActivityIndicator size={"large"} /> */}
      <Image
        source={require("../images/splash.gif")}
        style={{
          display: "flex",
          flex: 1,
          height: Dimensions.get("window").height * 0.8,
          width: Dimensions.get("window").width * 0.8,
        }}
      />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  mainSheet: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
