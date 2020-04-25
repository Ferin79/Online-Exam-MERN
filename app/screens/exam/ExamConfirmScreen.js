import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  ImageBackground,
} from "react-native";
import firebase from "../../config/firebase";
import { useFocusEffect } from "@react-navigation/native";
import SERVER from "../../config/variable";
import LoadingScreen from "../Loading";
import CustomButton from "../../components/buttons";

const ExamConfirmScreen = ({ navigation, route }) => {
  var _MOUNTED = false;

  const examid = route.params.examid || null;
  const examName = route.params.examname || null;
  const duration = route.params.duration || null;
  const desc = route.params.desc || null;

  const [email, setEmail] = useState(null);
  const [canAppear, setCanAppear] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${SERVER}admin/add/user-appeared-for-exam`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            examid,
          }),
        }
      );
      const responseData = await response.json();
      if (responseData.success === "1") {
        navigation.navigate("ExamMain", { duration, examid });
      } else {
        Alert.alert("Error Occured. Please Try Again Later");
      }
    } catch (error) {
      Alert.alert("Failed To Connect To Server");
    }
    setIsLoading(false);
  };

  const checkExam = async () => {
    if (_MOUNTED) {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER}admin/get/canUserAppear`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: firebase.auth().currentUser.email,
            examid,
          }),
        });
        const responseData = await response.json();

        if (_MOUNTED) {
          if (responseData.success === "1") {
            setCanAppear(true);
          } else {
            setCanAppear(false);
          }
        }
      } catch (error) {
        Alert.alert("Failed To Connect To Server");
      }
      if (_MOUNTED) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    _MOUNTED = true;
    setEmail(firebase.auth().currentUser.email);
    checkExam();

    return () => {
      _MOUNTED = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkExam();
      return () => {};
    }, [])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <ImageBackground
        source={require("../../images/signup_screen.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
        blurRadius={15}
      >
        <ScrollView>
          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "space-evenly",
              paddingLeft: 20,
              height: Dimensions.get("screen").height,
            }}
          >
            <View>
              <Text style={{ fontSize: 50, fontWeight: "bold" }}>
                You Ready
              </Text>
              <Text style={{ fontSize: 50, fontWeight: "bold" }}>
                For Exam !!!
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 10,
                }}
              >
                Name:
              </Text>
              <Text
                style={{ fontSize: 25, marginBottom: 10, fontWeight: "bold" }}
              >
                {examName}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 10,
                }}
              >
                Duration:
              </Text>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}
              >
                {duration + "Mins"}
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  marginBottom: 10,
                }}
              >
                Description:
              </Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>{desc}</Text>
            </View>

            {canAppear ? (
              <CustomButton
                title="Confirm And Start Exam"
                bgcolor="rgba(0,0,200,0.5)"
                txtcolor="white"
                fontSize={25}
                onClick={handleConfirm}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#2c3e50",
                  padding: 20,
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: "#fff" }}>
                  You Already Have Appeared for Exam
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ExamConfirmScreen;
