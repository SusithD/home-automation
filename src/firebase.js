// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, off } from "firebase/database";

// Your web app's Firebase configuration
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
const database = getDatabase(app);  // Get the database instance

export { database, ref, get, set, onValue, off };  // Export necessary methods for use in other files
