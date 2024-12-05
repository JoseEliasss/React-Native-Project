// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm-ougZpf0VXrHHZ7Sd8p3MNNHET5StDQ",
  authDomain: "native-9f199.firebaseapp.com",
  projectId: "native-9f199",
  storageBucket: "native-9f199.firebasestorage.app",
  messagingSenderId: "895606851131",
  appId: "1:895606851131:web:e1a94c99d7cd73c4c47e1e",
};

// Initialize Firebase
export const FIREBASE_APP =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
