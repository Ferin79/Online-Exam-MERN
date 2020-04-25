import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import LoadingScreen from "../Loading";
import firebase from "../../config/firebase";
import SERVER from "../../config/variable";

const Solution = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [notAttempted, setNotAttempted] = useState([]);

  const [correctData, setCorrectData] = useState([]);
  const [wrongData, setWrongData] = useState([]);
  const [notData, setNotData] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const { examid } = route.params;

  const fetchSolution = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER}admin/get/result-for-user`, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email: firebase.auth().currentUser.email,
          examid,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      setQuestionData(responseData.data);
      setCorrectAnswer(await JSON.parse(responseData.result[0].correctAnsArr));
      const data1 = JSON.parse(responseData.result[0].wrongAnsArr);
      setWrongAnswer(data1);
      setNotAttempted(await JSON.parse(responseData.result[0].notAttemtedArr));
      updateQuestion();
    } catch (error) {
      console.log(error);
      Alert.alert("Server Error");
    }
    setIsLoading(false);
  };

  const updateQuestion = () => {
    var correctAnsArr = [];
    var wrongAnsArr = [];
    var notAttemtedArr = [];

    for (let i = 0; i < correctAnswer.length; i++) {
      for (let j = 0; j < questionData.length; j++) {
        if (correctAnswer[i].questionId === questionData[j].id) {
          questionData[j].selectedOption = correctAnswer[i].selectedOption;
          correctAnsArr.push(questionData[j]);
        }
      }
    }

    for (let i = 0; i < wrongAnswer.length; i++) {
      for (let j = 0; j < questionData.length; j++) {
        if (wrongAnswer[i].questionId === questionData[j].id) {
          questionData[j].selectedOption = wrongAnswer[i].selectedOption;
          wrongAnsArr.push(questionData[j]);
        }
      }
    }

    for (let i = 0; i < notAttempted.length; i++) {
      for (let j = 0; j < questionData.length; j++) {
        if (notAttempted[i].questionId === questionData[j].id) {
          questionData[j].selectedOption = notAttempted[i].selectedOption;
          notAttemtedArr.push(questionData[j]);
        }
      }
    }
    setCorrectData(correctAnsArr);
    setWrongData(wrongAnsArr);
    console.log(wrongAnsArr);
    setNotData(notAttemtedArr);
  };

  useEffect(() => {
    fetchSolution();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20, margin: 20 }}>Correct Answer</Text>
          {correctData.length > 0
            ? correctData.map((data) => {
                return (
                  <View key={data.id}>
                    {data.isQuestionImage === "1" ? (
                      <View key={data.id}>
                        <Image
                          style={{
                            height: Dimensions.get("window").height * 0.2,
                            width: Dimensions.get("window").width * 0.8,
                          }}
                          source={{
                            uri: data.questionFile,
                          }}
                        />
                      </View>
                    ) : (
                      <View key={data.id}>
                        <Text>{data.questionText}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            : null}
        </View>

        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20, margin: 20 }}>Wrong Answer</Text>
          {wrongData.length > 0
            ? wrongData.map((data) => {
                return (
                  <View key={data.id}>
                    {data.isQuestionImage === "1" ? (
                      <View key={data.id}>
                        <Image
                          style={{
                            height: Dimensions.get("window").height * 0.2,
                            width: Dimensions.get("window").width * 0.8,
                          }}
                          source={{
                            uri: data.questionFile,
                          }}
                        />
                      </View>
                    ) : (
                      <View key={data.id}>
                        <Text>{data.questionText}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            : null}
        </View>

        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20, margin: 20 }}>
            Not Attempted Question
          </Text>
          {notData.length > 0
            ? notData.map((data) => {
                return (
                  <View key={data.id}>
                    {data.isQuestionImage === "1" ? (
                      <View key={data.id}>
                        <Image
                          style={{
                            height: Dimensions.get("window").height * 0.2,
                            width: Dimensions.get("window").width * 0.8,
                          }}
                          source={{
                            uri: data.questionFile,
                          }}
                        />
                      </View>
                    ) : (
                      <View key={data.id}>
                        <Text>{data.questionText}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Solution;
