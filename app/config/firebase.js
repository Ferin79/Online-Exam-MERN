import * as firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCNy4sFqCjh3Tuu89T3xb1dm5LA2EtK1hU",
  authDomain: "stray-cattle-75c17.firebaseapp.com",
  databaseURL: "https://stray-cattle-75c17.firebaseio.com",
  projectId: "stray-cattle-75c17",
  storageBucket: "stray-cattle-75c17.appspot.com",
  messagingSenderId: "53528137080",
  appId: "1:53528137080:web:00a7e104996683bebd8c8d",
  measurementId: "G-Y7YYNXVZR0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
