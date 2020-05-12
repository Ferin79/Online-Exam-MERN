import React from "react";
import { WebView } from "react-native-webview";

const Video = () => {
  return (
    <WebView
      source={{ uri: "https://www.youtube.com/embed/h9gkNtuZI4U" }}
      style={{ marginTop: 50 }}
    />
  );
};

export default Video;
