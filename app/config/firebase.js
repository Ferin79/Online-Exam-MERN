import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyDOdjTJEqjAyUHoEgxqXuvyAx-tq89jNvg",
  authDomain: "gravity-education-5e4b9.firebaseapp.com",
  databaseURL: "https://gravity-education-5e4b9.firebaseio.com",
  projectId: "gravity-education-5e4b9",
  storageBucket: "gravity-education-5e4b9.appspot.com",
  messagingSenderId: "907639568259",
  appId: "1:907639568259:web:8f9c2aec10984bd75928b6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
