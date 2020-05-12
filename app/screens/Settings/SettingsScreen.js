import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Share,
  Modal,
  TextInput,
  TouchableOpacityBase,
  Alert,
} from "react-native";
import { Entypo, MaterialIcons, Feather } from "@expo/vector-icons";
import firebase from "firebase";
import * as WebBrowser from "expo-web-browser";

const SettingsScreen = () => {
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(firebase.auth().currentUser.displayName);
    setEmail(firebase.auth().currentUser.email);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <ImageBackground
          source={require("../../images/Vector.png")}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.3,
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width,
              display: "flex",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Image source={require("../../images/coffee.png")} />
            <View>
              <Text style={{ fontSize: 35, color: "#fff" }}>Hi There!</Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>{name}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ margin: 50 }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Sorry",
                "FAQ are coming soon!!!. Till then contact Developer"
              );
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Entypo name="help" size={30} color="#33AE33" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>Get Help!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              try {
                const result = await Share.share(
                  {
                    message: "Download the Application from Link Below",
                    url: "https://expo.io/@darkKiller",
                    title: "Gravity Education",
                  },
                  {
                    dialogTitle: "Gravity Education",
                    title: "Gravity Education",
                  }
                );
              } catch (error) {
                alert(error.message);
              }
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Entypo name="share" size={30} color="#33AE33" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>
                Share With Friends
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <MaterialIcons name="feedback" size={30} color="#33AE33" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>Feedback</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await WebBrowser.openBrowserAsync(
                "https://ferin79.github.io/Portfolio"
              );
            }}
          >
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <MaterialIcons name="developer-mode" size={30} color="#33AE33" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>
                Developer Site
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => firebase.auth().signOut()}>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Feather name="power" size={30} color="#33AE33" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                margin: 50,
                height: Dimensions.get("window").height * 0.8,
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  Email
                </Text>
                <TextInput
                  style={{
                    height: 50,
                    width: Dimensions.get("window").width * 0.8,
                    borderColor: "#0ad",
                    borderWidth: 1,
                    paddingLeft: 20,
                    fontSize: 18,
                    borderRadius: 20,
                  }}
                  editable={false}
                  value={email}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  Subject
                </Text>
                <TextInput
                  placeholder="Enter Subject"
                  style={{
                    height: 50,
                    width: Dimensions.get("window").width * 0.8,
                    borderColor: "#0ad",
                    borderWidth: 1,
                    paddingLeft: 20,
                    fontSize: 18,
                    borderRadius: 20,
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  Message
                </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={100}
                  placeholder="Type Your Message Here ....."
                  style={{
                    height: 200,
                    width: Dimensions.get("window").width * 0.8,
                    borderColor: "#0ad",
                    borderWidth: 1,
                    paddingLeft: 20,
                    fontSize: 18,
                    borderRadius: 20,
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#33AE33",
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    borderRadius: 25,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: Dimensions.get("window").width * 0.5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    Send
                  </Text>
                  <MaterialIcons name="send" size={30} color="#fff" />
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
