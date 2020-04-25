import React, { useEffect, useState } from "react";
import MultipleChoice from "react-native-multiple-choice-picker";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CountDown from "react-native-countdown-component";
import SERVER from "../../config/variable";
import firebase from "../../config/firebase";
import LoadingScreen from "../Loading";
import { AdMobBanner, setTestDeviceIDAsync } from "expo-ads-admob";

const ExamMain = ({ route, navigation }) => {
  var _IsMounted = false;

  const [examId, setexamId] = useState(route.params.examid);
  const [duration, setDuration] = useState(route.params.duration);
  const [currentSelectedOption, setCurrentSelectedOption] = useState(null);
  const [questionData, setQuestionData] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [answersData, setAnswersData] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [uid, setUid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchQuestion = async () => {
    try {
      const response = await fetch(`${SERVER}admin/get/exam-question`, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          examid: examId,
        }),
      });
      const responseData = await response.json();
      if (responseData.success === "1") {
        setQuestionData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = (event) => {
    const data = answersData;
    if (data[questionCount].selectedOption === event) {
      setCurrentSelectedOption(null);
      data[questionCount].selectedOption = null;
      data[questionCount].isAnswered = 0;
    } else {
      setCurrentSelectedOption(event);
      data[questionCount].selectedOption = parseInt(event);
      data[questionCount].isAnswered = 1;
    }
    data[questionCount].isVisited = 1;
    setAnswersData(data);
    console.log(data);
  };

  const setOptionValue = () => {
    var answer = [];
    questionData.map((data) => {
      answer.push({
        questionId: data.id,
        isVisited: 0,
        isAnswered: 0,
        selectedOption: null,
        correctAnswer: parseInt(data.correctAns),
        weightage: parseInt(data.weightage),
      });
    });
    console.log(answer);
    setAnswersData(answer);
  };
  const setVisitedTrue = () => {
    if (answersData.length > 0) {
      const data = answersData;
      data[questionCount].isVisited = 1;
      setAnswersData(data);
    }
  };
  const setSelectedOption = () => {
    if (answersData.length > 0) {
      const data = answersData;
      setCurrentSelectedOption(data[questionCount].selectedOption);
    }
  };
  const handleCompleteExam = async () => {
    setIsLoading(true);
    console.log("Exam Completed");

    var correctAns = 0;
    var correctAnsArray = [];

    var wrongAns = 0;
    var wrongAnsArray = [];

    var notAttemted = 0;
    var notAttemptedArray = [];

    var marks = 0;
    var totalMarks = 0;

    answersData.map((data) => {
      totalMarks = totalMarks + data.weightage;
      if (data.isVisited) {
        if (data.isAnswered) {
          if (data.correctAnswer === data.selectedOption + 1) {
            correctAns++;
            marks = marks + parseInt(data.weightage);
            correctAnsArray.push({
              questionId: data.questionId,
              selectedOption: data.selectedOption,
            });
          } else {
            wrongAns++;
            wrongAnsArray.push({
              questionId: data.questionId,
              selectedOption: data.selectedOption,
            });
          }
        } else {
          notAttemted++;
          notAttemptedArray.push({
            questionId: data.questionId,
            selectedOption: data.selectedOption,
          });
        }
      } else {
        notAttemted++;
        notAttemptedArray.push({
          questionId: data.questionId,
          selectedOption: data.selectedOption,
        });
      }
    });
    try {
      const response = await fetch(`${SERVER}admin/add/result`, {
        method: "POST",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          correctAns,
          correctAnsArray,
          wrongAns,
          wrongAnsArray,
          notAttemted,
          notAttemptedArray,
          marks,
          examid: examId,
          userEmail,
          uid,
          totalMarks,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success === "1") {
        navigation.navigate("ExamResult", {
          correctAns,
          wrongAns,
          notAttemted,
          marks,
          totalMarks,
        });
      } else {
        Alert.alert("Error Occured");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const handleFinish = () => {
    var answered = 0;
    var left = 0;
    answersData.map((data) => {
      if (data.isAnswered === 1) {
        answered++;
      } else {
        left++;
      }
    });
    Alert.alert(
      "Are you Sure ?",
      `You have Answered ${answered} questions and ${left} are remaining`,
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Submit Exam",
          onPress: () => {
            handleCompleteExam();
          },
        },
      ]
    );
  };

  const RenderAds = () => {
    return <View></View>;
  };

  const fetchUserDetails = () => {
    setUserEmail(firebase.auth().currentUser.email);
    setUid(firebase.auth().currentUser.uid);
  };
  useEffect(() => {
    _IsMounted = true;
    fetchQuestion();
    fetchUserDetails();
    return () => {
      _IsMounted = false;
    };
  }, []);
  useEffect(() => {
    setVisitedTrue();
    setSelectedOption();
  }, [questionCount]);

  useEffect(() => {
    setOptionValue();
  }, [questionData]);

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
          {questionData.length > 0 ? (
            <View
              key={questionData[0].id}
              style={{
                width: Dimensions.get("window").width,
              }}
            >
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 16 }}>
                  Question {questionCount + 1} of {questionData.length}
                </Text>
              </View>

              {questionData[questionCount].isQuestionImage === "1" ? (
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
                      uri: questionData[questionCount].questionFile,
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
                    {questionData[questionCount].questionText}
                  </Text>
                </View>
              )}
              <RenderOption />
            </View>
          ) : (
            <View>
              <Text>Not Here</Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  const RenderOption = () => {
    return (
      <View>
        {questionData.length > 0 ? (
          <View>
            {questionData[questionCount].isOptionImage === "1" ? (
              <MultipleChoice
                direction={"column"}
                chosenIndex={currentSelectedOption}
                choices={[
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.5,
                      width: Dimensions.get("window").width * 0.8,
                    }}
                    source={{
                      uri: questionData[questionCount].optionAFile,
                    }}
                  />,
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.5,
                      width: Dimensions.get("window").width * 0.8,
                    }}
                    source={{
                      uri: questionData[questionCount].optionBFile,
                    }}
                  />,
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.5,
                      width: Dimensions.get("window").width * 0.8,
                    }}
                    source={{
                      uri: questionData[questionCount].optionCFile,
                    }}
                  />,
                  <Image
                    style={{
                      height: Dimensions.get("window").height * 0.5,
                      width: Dimensions.get("window").width * 0.8,
                    }}
                    source={{
                      uri: questionData[questionCount].optionDFile,
                    }}
                  />,
                ]}
                onPress={(event) => {
                  handleOnClick(event);
                }}
              />
            ) : (
              <MultipleChoice
                direction={"column"}
                chosenIndex={currentSelectedOption}
                choices={[
                  questionData[questionCount].optionAText,
                  questionData[questionCount].optionBText,
                  questionData[questionCount].optionCText,
                  questionData[questionCount].optionDText,
                ]}
                onPress={(event) => {
                  handleOnClick(event);
                }}
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
        {questionCount + 1 < questionData.length ? (
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
          <Button color="red" title="Finish" onPress={handleFinish} />
        </View>
      </View>
    );
  };
  const RenderPaginationSample = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          paddingVertical: 20,
          borderTopWidth: 2,
          borderBottomWidth: 2,
        }}
      >
        <View>
          <Text
            style={{
              width: Dimensions.get("window").width * 0.15,
              padding: 20,
              backgroundColor: "#0af",
              color: "#fff",
              margin: 10,
            }}
          ></Text>
          <Text>Answered</Text>
        </View>
        <View>
          <Text
            style={{
              width: Dimensions.get("window").width * 0.15,
              padding: 20,
              backgroundColor: "red",
              color: "#fff",
              margin: 10,
            }}
          ></Text>
          <Text>Not Answered</Text>
        </View>
      </View>
    );
  };
  const RenderPagination = () => {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          display: "flex",
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginHorizontal: "auto",
        }}
      >
        {questionData.length > 0
          ? answersData.map((data, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setQuestionCount(index);
                  }}
                >
                  <Text
                    style={{
                      padding: 20,
                      backgroundColor:
                        answersData[index].isAnswered === 1 ? "#0af" : "red",
                      color: "#fff",
                      margin: 10,
                    }}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              );
            })
          : null}
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
          <View
            style={{
              width: Dimensions.get("window").width,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              zIndex: 1,
              marginBottom: 50,
            }}
          >
            <CountDown
              until={0 + 60 * duration + 0}
              size={25}
              onFinish={() => {
                Alert.alert(
                  "Time Up !!",
                  "Exam will Automatically will be submitted...",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        handleCompleteExam();
                      },
                    },
                  ]
                );
              }}
              digitStyle={{ backgroundColor: "#fff" }}
              digitTxtStyle={{ color: "#000" }}
              timeToShow={["H", "M", "S"]}
              timeLabels={{ h: null, m: null, s: null }}
            />
          </View>
          <ScrollView>
            <RenderQuestion />
            <Renderbutton />
            <RenderPaginationSample />
            <RenderPagination />
            <RenderAds />
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ExamMain;
