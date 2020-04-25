import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ExamResult = ({ route, navigation }) => {
  const { correctAns, marks, notAttemted, totalMarks, wrongAns } = route.params;
  const percenatge = ((parseInt(marks) * 100) / parseInt(totalMarks)).toFixed(
    2
  );
  console.log(route);
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {percenatge > 33 ? (
            <Image source={require("../../images/reward.png")} />
          ) : (
            <Image source={require("../../images/fail.png")} />
          )}
          <Text
            style={{ fontSize: 40, fontWeight: "bold", marginVertical: 20 }}
          >
            {percenatge}%
          </Text>
          <Text style={{ fontSize: 30 }}>
            {percenatge > 33 ? "Congrats!" : "Fail"}
          </Text>
          <Text style={{ fontSize: 18, marginVertical: 10 }}>
            {percenatge > 33
              ? "You have Passed the exam!"
              : "You Failed the exam"}
          </Text>
        </View>
        <View
          style={{
            borderTopWidth: 2,
            borderBottomWidth: 2,
            marginVertical: 20,
            width: Dimensions.get("window").width * 0.8,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View style={styles.resultStyle}>
            <Text style={{ fontSize: 20 }}>Correct Answer :</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {correctAns}
            </Text>
          </View>
          <View style={styles.resultStyle}>
            <Text style={{ fontSize: 20 }}>Wrong Answer :</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{wrongAns}</Text>
          </View>
          <View style={styles.resultStyle}>
            <Text style={{ fontSize: 20 }}>Not Attempted :</Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {notAttemted}
            </Text>
          </View>
          <View style={{ borderWidth: 1, marginVertical: 20 }}></View>
          <View style={styles.resultStyle}>
            <Text style={{ fontSize: 20, color: "green" }}>
              Obtained Marks :
            </Text>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "green" }}>
              {marks}
            </Text>
          </View>
          <View style={styles.resultStyle}>
            <Text style={{ fontSize: 20 }}>Total Marks :</Text>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {totalMarks}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Exam");
            }}
          >
            <View
              style={{
                paddingHorizontal: 50,
                paddingVertical: 20,
                backgroundColor: "coral",
                borderRadius: 30,
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff" }}>Finished</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExamResult;

const styles = StyleSheet.create({
  resultStyle: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
});
