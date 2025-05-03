import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVEAIiTrwCgJ0NCuPbWEgYzl1OTXb_15k",
  authDomain: "react-netflix-clone-5cdb5.firebaseapp.com",
  projectId: "react-netflix-clone-5cdb5",
  storageBucket: "react-netflix-clone-5cdb5.firebasestorage.app",
  messagingSenderId: "331945908953",
  appId: "1:331945908953:web:cce4f0d9789b8d301f3cc8",
  measurementId: "G-4Z3JGCLWJW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);