// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWmyFPYzsMObMWVRkSpI3TuIogQJM-eZM",
  authDomain: "spartan-space.firebaseapp.com",
  projectId: "spartan-space",
  storageBucket: "spartan-space.appspot.com",
  messagingSenderId: "993261264977",
  appId: "1:993261264977:web:4cdfac3847f52e21eb9870",
  measurementId: "G-HT7529FTL9",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
