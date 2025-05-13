// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBon4Nz7LT5Xp3Pl4AJ75r4mMriZWFVrso",
  authDomain: "aura-safe-gaurd-app.firebaseapp.com",
  projectId: "aura-safe-gaurd-app",
  storageBucket: "aura-safe-gaurd-app.firebasestorage.app",
  messagingSenderId: "535957854875",
  appId: "1:535957854875:web:4eba89496afd87730a843e",
  measurementId: "G-GQRPTZGR2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);