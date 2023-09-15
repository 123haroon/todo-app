// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQWXSxCyhdJxSAXbdMUd1RoQLTTXLmRbI",
  authDomain: "todo-0909-92d74.firebaseapp.com",
  projectId: "todo-0909-92d74",
  storageBucket: "todo-0909-92d74.appspot.com",
  messagingSenderId: "257713626813",
  appId: "1:257713626813:web:302ba60346c4a7c47321d4",
  measurementId: "G-53VRQBGWB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
export{app ,firestore,analytics}