import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../../config/firebase";
import Loading from "../Loading";

const SignUpScreen = () => {
  const [windowHeight, setWindowHeight] = useState(200);
  const [windowWidth, setWindowWidth] = useState(200);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    setWindowHeight(Dimensions.get("window").height);
    setWindowWidth(Dimensions.get("window").width);
  }, []);

  const signupWithEmail = () => {
    if (password == repeatPassword) {
      if (password.length >= 6) {
        try {
          setIsLoading(true);
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async (user) => {
              await firebase.auth().currentUser.updateProfile({
                displayName: name,
              });
              console.log(user);
            })
            .catch((error) => {
              Alert.alert(error.toString());
              console.log("Error from this " + error.toString());
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        Alert.alert("Password should be at least 6 characters");
        setPassword("");
        setRepeatPassword("");
      }
    } else {
      Alert.alert("Password Does Not Match");
      setPassword("");
      setRepeatPassword("");
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.defaultStyle}>
        <ImageBackground
          source={require("../../images/signup_screen.jpg")}
          style={styles.backgroundImage}
        >
          <ScrollView>
            <View
              style={{
                height: windowHeight,
                display: "flex",
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  Create Account
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: windowWidth * 0.8,
                    display: "flex",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    shadowOffset: { width: 5, height: 1 },
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                  }}
                >
                  <Ionicons name="ios-person" size={30} color="#000" />
                  <TextInput
                    onChangeText={(text) => setName(text)}
                    value={name}
                    style={{
                      width: windowWidth * 0.6,
                      height: 50,
                      fontWeight: "bold",
                    }}
                    placeholder="Full Name"
                    placeholderTextColor="black"
                    keyboardType="default"
                  />
                </View>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    display: "flex",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    shadowOffset: { width: 5, height: 1 },
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                  }}
                >
                  <Ionicons name="ios-call" size={30} color="#000" />
                  <TextInput
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                    style={{
                      width: windowWidth * 0.6,
                      height: 50,
                      fontWeight: "bold",
                    }}
                    placeholder="Phone Number"
                    placeholderTextColor="black"
                    keyboardType="phone-pad"
                  />
                </View>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    display: "flex",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    shadowOffset: { width: 5, height: 1 },
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                  }}
                >
                  <Ionicons name="ios-mail" size={30} color="#000" />
                  <TextInput
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    style={{
                      width: windowWidth * 0.6,
                      height: 50,
                      fontWeight: "bold",
                    }}
                    placeholder="Email"
                    placeholderTextColor="black"
                    keyboardType="email-address"
                  />
                </View>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    display: "flex",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    shadowOffset: { width: 5, height: 1 },
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                  }}
                >
                  <Ionicons name="ios-lock" size={30} color="#000" />
                  <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    style={{
                      width: windowWidth * 0.6,
                      height: 50,
                      fontWeight: "bold",
                    }}
                    placeholder="Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    keyboardType="default"
                  />
                </View>
                <View
                  style={{
                    width: windowWidth * 0.8,
                    display: "flex",
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderWidth: 1,
                    borderRadius: 20,
                    shadowOffset: { width: 5, height: 1 },
                    elevation: 1,
                    shadowColor: "black",
                    shadowOpacity: 0.2,
                  }}
                >
                  <Ionicons name="ios-lock" size={30} color="#000" />
                  <TextInput
                    onChangeText={(text) => setRepeatPassword(text)}
                    value={repeatPassword}
                    style={{
                      width: windowWidth * 0.6,
                      height: 50,
                      fontWeight: "bold",
                    }}
                    placeholder="Repeat Password"
                    placeholderTextColor="black"
                    secureTextEntry={true}
                    keyboardType="default"
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: windowWidth,
                    paddingRight: 20,
                    paddingTop: 20,
                  }}
                  onPress={signupWithEmail}
                >
                  <View
                    style={{
                      paddingTop: -20,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <Text
                      style={{ fontSize: 30, padding: 10, fontWeight: "bold" }}
                    >
                      Create
                    </Text>
                    <Ionicons
                      name="ios-arrow-dropright-circle"
                      color="#0af"
                      size={50}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View></View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default SignUpScreen;

const styles = StyleSheet.create({
  defaultStyle: {
    display: "flex",
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
