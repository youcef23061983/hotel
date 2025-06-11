// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "hotel-4df49.firebaseapp.com",
  projectId: "hotel-4df49",
  storageBucket: "hotel-4df49.firebasestorage.app",
  messagingSenderId: "520485657600",
  appId: "1:520485657600:web:0703d821dbcebb58f28ce5",
  measurementId: "G-SZ3BZRWRBE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
