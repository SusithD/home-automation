// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiQLzxRJQKMI6-lM-jw56HxjP9rSLEI7Q",
  authDomain: "iot-project-sample-b44ca.firebaseapp.com",
  databaseURL: "https://iot-project-sample-b44ca-default-rtdb.firebaseio.com",
  projectId: "iot-project-sample-b44ca",
  storageBucket: "iot-project-sample-b44ca.firebasestorage.app",
  messagingSenderId: "627944878488",
  appId: "1:627944878488:web:c9e80fec6014b528037bed",
  measurementId: "G-6BDXZ76VQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);