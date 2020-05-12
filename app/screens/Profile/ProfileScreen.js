import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import firebase from "../../config/firebase";
import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const ProfileScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [newName, setNewName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const fetchUserDetails = () => {
    setDisplayName(firebase.auth().currentUser.displayName);
    setNewName(firebase.auth().currentUser.displayName);
    setPhotoURL(firebase.auth().currentUser.photoURL);
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result);
        setProfileImage(result.uri);
        try {
          firebase
            .auth()
            .currentUser.updateProfile({
              photoURL: result.uri,
            })
            .then(function () {
              setPhotoURL(firebase.auth().currentUser.photoURL);
            });
        } catch (error) {
          console.log(error);
          Alert.alert("Error Updating Profile Pic");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetails();
    getPermissionAsync();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height * 0.4,
            backgroundColor: "#FDA26B",
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
            onEditPress={() => pickImage()}
            source={{
              uri:
                photoURL ||
                "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
            }}
          />
          <Text style={{ color: "#fff", paddingTop: 25 }}>
            {firebase.auth().currentUser.email}
          </Text>
          <Text style={{ fontSize: 25, color: "#fff", paddingTop: 10 }}>
            {displayName}
          </Text>
        </View>

        <View style={{ margin: 50 }}>
          <View
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <MaterialCommunityIcons name="account" size={30} color="#FDA26B" />
            <TextInput
              placeholder="Enter Name"
              value={newName}
              onChangeText={(event) => {
                setNewName(event);
              }}
              onEndEditing={() => {
                try {
                  firebase
                    .auth()
                    .currentUser.updateProfile({
                      displayName: newName,
                    })
                    .then(function () {
                      setNewName(firebase.auth().currentUser.displayName);
                      setDisplayName(firebase.auth().currentUser.displayName);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } catch (error) {
                  Alert.alert("Error Updating Profile Name");
                  console.log(error);
                }
              }}
              style={{
                fontSize: 20,
                paddingLeft: 50,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ResultList")}>
            <View
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Foundation name="results" size={30} color="#FDA26B" />
              <Text style={{ paddingLeft: 50, fontSize: 20 }}>
                View All Results
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
