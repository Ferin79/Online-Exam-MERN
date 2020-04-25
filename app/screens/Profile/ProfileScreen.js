import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "../../config/firebase";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const fetchUserDetails = () => {
    setDisplayName(firebase.auth().currentUser.displayName);
    setPhotoURL(firebase.auth().currentUser.photoURL);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.4,
            backgroundColor: "#000",
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            size="xlarge"
            rounded
            title={displayName}
            showEditButton
            source={{
              uri:
                photoURL ||
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}
          />
          <Text style={{ fontSize: 25, color: "#fff", paddingTop: 25 }}>
            {displayName}
          </Text>
        </View>

        <View style={{ marginVertical: 50 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ResultList");
            }}
          >
            <View style={style.cardStyle}>
              <Text style={{ fontSize: 20 }}>View Results</Text>
              <Feather name="chevron-right" size={25} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Here")}>
            <View style={style.cardStyle}>
              <Text style={{ fontSize: 20 }}>Send Feedback</Text>
              <Feather name="chevron-right" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  cardStyle: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,
  },
});
