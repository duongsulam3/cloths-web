// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbqVhi0EVCt0iShrko-gx4hT4eJKlXnVo",
  authDomain: "shopping-app-flutter-8f35d.firebaseapp.com",
  projectId: "shopping-app-flutter-8f35d",
  storageBucket: "shopping-app-flutter-8f35d.appspot.com",
  messagingSenderId: "246684481212",
  appId: "1:246684481212:web:4432019c154b5d17c282b9",
  measurementId: "G-H0NPX8H0XZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export const db = getFirestore(app);
