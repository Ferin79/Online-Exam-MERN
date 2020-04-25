import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

const Button = (props) => {
  console.log(props);
  return (
    <TouchableOpacity onPress={props.onClick}>
      <View
        style={{
          width: "auto",
          padding: props.padding || 20,
          backgroundColor: props.bgcolor || "rgba(0,0,255,0.5)",
          borderRadius: 25,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            color: props.txtcolor || "#fff",
            fontSize: props.fontSize || 23,
            textAlign: "center",
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
