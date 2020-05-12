import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LoadingScreen from "../Loading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PTRView from "react-native-pull-to-refresh";
import SERVER from "../../config/variable";

const ExamScreen = ({ navigation }) => {
  var _MOUNTED = false;

  var colorIndex = 0;
  const colors = [
    "rgba(225,0,0,0.7)",
    "rgba(0,225,0,0.7)",
    "rgba(0,0,225,0.6)",
    "rgba(225,225,0,0.7)",
    "rgba(0,225,225,0.7)",
    "rgba(225,0,225,0.6)",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [examListData, setExamListData] = useState([]);

  const fetchExamList = async () => {
    if (_MOUNTED) {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER}admin/get/live-exam-list`);
        const responseData = await response.json();
        if (_MOUNTED) {
          setExamListData(responseData.data);
        }
      } catch (error) {
        Alert.alert("Failed To Connect To Server");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    _MOUNTED = true;
    fetchExamList();

    return () => {
      console.log("UnMounted");
      _MOUNTED = false;
    };
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      // Prevent default behavior
      e.preventDefault();

      console.log("Tab Bar Press");
    });
    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView
      style={{
        display: "flex",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../../images/signup_screen.jpg")}
        blurRadius={5}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      >
        <PTRView
          onRefresh={() => {
            console.log("here");
            fetchExamList();
          }}
        >
          <ScrollView>
            {examListData.length > 0 ? (
              examListData.map((data) => {
                if (colorIndex === 6) {
                  colorIndex = 0;
                } else {
                  colorIndex++;
                }
                return (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.navigate("ExamConfirm", {
                        examid: data.id,
                        examname: data.exam_name,
                        duration: data.exam_duration,
                        desc: data.instruction,
                      });
                    }}
                  >
                    <View
                      style={{
                        padding: 20,
                        backgroundColor: colors[colorIndex],
                        margin: 10,
                        borderRadius: 10,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        shadowColor: "grey",
                        shadowOffset: {
                          height: 10,
                          width: 10,
                        },
                        shadowRadius: 10,
                        elevation: 2,
                      }}
                    >
                      <View>
                        <Text style={{ fontSize: 25, color: "white" }}>
                          {data.exam_name}
                        </Text>
                        <Text style={{ marginVertical: 20, color: "white" }}>
                          {data.instruction}
                        </Text>
                        <Text style={{ color: "white" }}>
                          Duration:{" "}
                          <Text style={{ fontWeight: "bold" }}>
                            {data.exam_duration} Minutes
                          </Text>
                        </Text>
                      </View>
                      <MaterialCommunityIcons
                        name="arrow-right-bold-circle-outline"
                        size={50}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            ) : (
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  height: Dimensions.get("window").height,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 25 }}>No Exams Available</Text>
                <Text style={{ fontSize: 20, margin: 20 }}>Enjoy!!!!!</Text>
              </View>
            )}
          </ScrollView>
        </PTRView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ExamScreen;
