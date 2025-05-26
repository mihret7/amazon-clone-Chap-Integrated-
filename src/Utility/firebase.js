// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxGxcmVJLyqC-gu6RyKrqu8rdbAHWmBfE",
  authDomain: "clone-9679c.firebaseapp.com",
  projectId: "clone-9679c",
  storageBucket: "clone-9679c.firebasestorage.app",
  messagingSenderId: "80104195222",
  appId: "1:80104195222:web:7bf9ccb9896ed805c0aeb7",
  measurementId: "G-3TC9CXQZ35"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);