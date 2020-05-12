import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import firebase from "../../config/firebase";

const HomeScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(firebase.auth().currentUser.displayName);
  }, []);

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <ScrollView>
        <View style={{ margin: 25 }}>
          <Text style={{ fontSize: 30 }}>Hello</Text>
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            {firebase.auth().currentUser.displayName}
          </Text>
        </View>

        <View>
          <Text style={{ margin: 25, fontSize: 20, fontWeight: "bold" }}>
            Practice
          </Text>
          <View
            style={{
              width: Dimensions.get("window").width,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                elevation: 2,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                  height: 5,
                  width: 5,
                },
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClassList", { subjectid: 1 });
                }}
              >
                <Image
                  source={require("../../images/physics.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 20, paddingTop: 10 }}
                >
                  Physics
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                elevation: 2,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                  height: 5,
                  width: 5,
                },
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClassList", { subjectid: 2 });
                }}
              >
                <Image
                  source={require("../../images/chemistry.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 20, paddingTop: 10 }}
                >
                  Chemistry
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingTop: 50,
              width: Dimensions.get("window").width,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View
              style={{
                elevation: 2,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                  height: 5,
                  width: 5,
                },
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClassList", { subjectid: 3 });
                }}
              >
                <Image
                  source={require("../../images/maths.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 20, paddingTop: 10 }}
                >
                  Maths
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                elevation: 2,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {
                  height: 5,
                  width: 5,
                },
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ClassList", { subjectid: 4 });
                }}
              >
                <Image
                  source={require("../../images/biology.png")}
                  style={{ width: 150, height: 150 }}
                />
                <Text
                  style={{ textAlign: "center", fontSize: 20, paddingTop: 10 }}
                >
                  Biology
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
