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
import LoadingScreen from "../Loading";
import SERVER from "../../config/variable";

const ChapterList = ({ route, navigation }) => {
  var colorIndex = 0;
  const colors = [
    "rgba(225,0,0,0.5)",
    "rgba(0,225,0,0.5)",
    "rgba(0,0,225,0.5)",
    "rgba(225,225,0,0.7)",
    "rgba(0,225,225,0.5)",
    "rgba(225,0,225,0.4)",
  ];
  let { classid, subject } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [chapterData, setChapterData] = useState([]);

  const fetchChapter = async () => {
    setIsLoading(true);
    try {
      console.log(classid, subject);
      const response = await fetch(
        `${SERVER}admin/get/chapter/${classid}/${subject}`
      );
      const responseData = await response.json();
      setChapterData(responseData.data);
    } catch (error) {
      console.log(error);
      Alert.alert("Server Error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchChapter();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginVertical: 50 }}>
          {chapterData.length > 0 ? (
            chapterData.map((data) => {
              if (colorIndex === 5) {
                colorIndex = 0;
              }
              colorIndex++;
              return (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.navigate("VideoPlayer");
                  }}
                >
                  <View
                    style={{
                      width: Dimensions.get("window").width * 0.7,
                      padding: 25,
                      backgroundColor: colors[colorIndex],
                      marginVertical: 20,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 20,
                      }}
                    >
                      {data.chaptername}
                    </Text>
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
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 25 }}>
                Nothing To Show
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChapterList;
