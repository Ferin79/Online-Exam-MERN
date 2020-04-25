import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";

const ClassList = ({ route, navigation }) => {
  const { subjectid } = route.params;
  console.log(route);
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            marginVertical: 50,
            display: "flex",
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChapterList", {
                subject: subjectid,
                classid: 1,
              });
            }}
          >
            <View style={styles.classWrapper}>
              <Text style={styles.classText}>11</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ChapterList", {
                subject: subjectid,
                classid: 2,
              });
            }}
          >
            <View style={styles.classWrapper}>
              <Text style={styles.classText}>12</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Tutorials are Currently Not Available");
            }}
          >
            <View style={styles.classWrapper}>
              <Text style={styles.classText}>JEE</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Alert.alert("Tutorials are Currently Not Available");
            }}
          >
            <View style={styles.classWrapper}>
              <Text style={styles.classText}>NEET</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  classWrapper: {
    padding: 25,
    backgroundColor: "#0af",
    width: Dimensions.get("window").width * 0.4,
    marginVertical: 25,
  },
  classText: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
});
