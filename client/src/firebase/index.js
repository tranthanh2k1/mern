import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCkbu9JF9QRk-vGD7M02CO3MNevhikvJSk",
  authDomain: "reactjs-f980d.firebaseapp.com",
  projectId: "reactjs-f980d",
  storageBucket: "reactjs-f980d.appspot.com",
  messagingSenderId: "213561499929",
  appId: "1:213561499929:web:ae6ff9a91fb853ed696588",
  measurementId: "G-2ZQ5RX7YWP",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
