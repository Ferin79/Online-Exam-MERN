import React, { useEffect, useState } from "react";
import MultipleChoice from "react-native-multiple-choice-picker";
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground,
  Button,
} from "react-native";
import LoadingScreen from "../Loading";
import firebase from "../../config/firebase";
import SERVER from "../../config/variable";

const Solution = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [wrongAnswer, setWrongAnswer] = useState([]);
  const [notAttempted, setNotAttempted] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [allQuestion, setAllQuestion] = useState([]);
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
      setQuestionData(responseData.data);
      setCorrectAnswer(await JSON.parse(responseData.result[0].correctAnsArr));
      const data1 = JSON.parse(responseData.result[0].wrongAnsArr);
      setWrongAnswer(data1);
      setNotAttempted(await JSON.parse(responseData.result[0].notAttemtedArr));
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

    setAllQuestion([...correctAnsArr, ...wrongAnsArr, ...notAttemtedArr]);
  };

  useEffect(() => {
    fetchSolution();
  }, []);
  useEffect(() => {
    if (questionData.length > 0) {
      updateQuestion();
    }
  }, [questionData, correctAnswer, wrongAnswer, notAttempted]);

  const RenderQuestion = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width * 0.95,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e1f5fe",
            marginHorizontal: "auto",
            borderRadius: 20,
            paddingVertical: 20,
            shadowColor: "#000",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}
        >
          {allQuestion.length > 0 ? (
            <View
              key={allQuestion[0].id}
              style={{
                width: Dimensions.get("window").width,
              }}
            >
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 16 }}>
                  Question {questionCount + 1} of {allQuestion.length}
                </Text>
              </View>

              {allQuestion[questionCount].isQuestionImage === "1" ? (
                <View
                  style={{
                    width: Dimensions.get("window").width,
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.5,
                      width: Dimensions.get("window").width * 0.8,
                    }}
                    source={{
                      uri: allQuestion[questionCount].questionFile,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    marginVertical: 20,
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 35, margin: 15 }}>
                    {allQuestion[questionCount].questionText}
                  </Text>
                </View>
              )}
              <RenderOption />
            </View>
          ) : (
            <View>
              <Text>No Data</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const RenderOption = () => {
    return (
      <View>
        {allQuestion.length > 0 ? (
          <View>
            {allQuestion[questionCount].isOptionImage === "1" ? (
              <MultipleChoice
                direction={"column"}
                chosenIndex={allQuestion[questionCount].selectedOption}
                choices={[
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.3,
                      width: Dimensions.get("window").width * 0.6,
                    }}
                    source={{
                      uri: allQuestion[questionCount].optionAFile,
                    }}
                  />,
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.3,
                      width: Dimensions.get("window").width * 0.6,
                    }}
                    source={{
                      uri: allQuestion[questionCount].optionBFile,
                    }}
                  />,

                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.3,
                      width: Dimensions.get("window").width * 0.6,
                    }}
                    source={{
                      uri: allQuestion[questionCount].optionCFile,
                    }}
                  />,
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.3,
                      width: Dimensions.get("window").width * 0.6,
                    }}
                    source={{
                      uri: allQuestion[questionCount].optionDFile,
                    }}
                  />,
                ]}
              />
            ) : (
              <MultipleChoice
                direction={"column"}
                chosenIndex={allQuestion[questionCount].selectedOption}
                choices={[
                  <Text
                    style={{
                      backgroundColor:
                        allQuestion[questionCount].selectedOption == 0
                          ? allQuestion[questionCount].correctAns == "1"
                            ? "green"
                            : "red"
                          : allQuestion[questionCount].correctAns == "1"
                          ? "green"
                          : "white",
                    }}
                  >
                    {allQuestion[questionCount].optionAText}
                  </Text>,
                  <Text
                    style={{
                      backgroundColor:
                        allQuestion[questionCount].selectedOption == 1
                          ? allQuestion[questionCount].correctAns == "2"
                            ? "green"
                            : "red"
                          : allQuestion[questionCount].correctAns == "2"
                          ? "green"
                          : "white",
                    }}
                  >
                    {allQuestion[questionCount].optionBText}
                  </Text>,
                  <Text
                    style={{
                      backgroundColor:
                        allQuestion[questionCount].selectedOption == 2
                          ? allQuestion[questionCount].correctAns == "3"
                            ? "green"
                            : "red"
                          : allQuestion[questionCount].correctAns == "3"
                          ? "green"
                          : "white",
                    }}
                  >
                    {allQuestion[questionCount].optionCText}
                  </Text>,
                  <Text
                    style={{
                      backgroundColor:
                        allQuestion[questionCount].selectedOption == 3
                          ? allQuestion[questionCount].correctAns == "4"
                            ? "green"
                            : "red"
                          : allQuestion[questionCount].correctAns == "4"
                          ? "green"
                          : "white",
                    }}
                  >
                    {allQuestion[questionCount].optionDText}
                  </Text>,
                ]}
              />
            )}
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  };
  const Renderbutton = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          display: "flex",
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        {questionCount != 0 ? (
          <View>
            <Button
              color="#f9a602"
              title="Prev"
              onPress={() => {
                setQuestionCount(() => questionCount - 1);
              }}
            />
          </View>
        ) : null}
        {questionCount + 1 < allQuestion.length ? (
          <View>
            <Button
              title="Next"
              onPress={() => {
                setQuestionCount(() => questionCount + 1);
              }}
            />
          </View>
        ) : null}

        <View>
          <Button
            color="red"
            title="Finish"
            onPress={() => navigation.navigate("ResultList")}
          />
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={{ display: "flex", flex: 1 }}>
      <ImageBackground
        source={require("../../images/signup_screen.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView>
            <RenderQuestion />
            <Renderbutton />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Solution;
