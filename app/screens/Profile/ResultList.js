import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SERVER from "../../config/variable";
import firebase from "../../config/firebase";
import LoadingScreen from "../Loading";

const ResultList = ({ navigation }) => {
  var colorIndex = 0;
  const colors = [
    "rgba(225,0,0,0.5)",
    "rgba(0,225,0,0.5)",
    "rgba(0,0,225,0.5)",
    "rgba(225,225,0,0.7)",
    "rgba(0,225,225,0.5)",
    "rgba(225,0,225,0.4)",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [examList, setExamList] = useState([]);

  const fetchExamList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER}admin/get/get-examlist-by-user`, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email: firebase.auth().currentUser.email,
        }),
      });
      const responseData = await response.json();
      console.log(responseData.data);
      setExamList(responseData.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Server Error");
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchExamList();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {examList.length > 0 ? (
            examList.map((data) => {
              if (colorIndex === 6) {
                colorIndex = 0;
              }
              const examid = data.id;
              colorIndex++;
              return (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.navigate("Solution", { examid });
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      backgroundColor: colors[colorIndex],
                      margin: 20,
                      borderRadius: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        color: "#fff",
                        marginVertical: 10,
                      }}
                    >
                      {data.exam_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#fff",
                        marginVertical: 5,
                      }}
                    >
                      {data.exam_duration} Mins
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        marginVertical: 5,
                      }}
                    >
                      {data.instruction}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View
              style={{
                height: Dimensions.get("window").height,
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>No Result To Show</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultList;
