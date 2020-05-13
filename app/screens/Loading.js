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
        source={require("../images/book2.gif")}
        style={{
          display: "flex",
          flex: 1,
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
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
