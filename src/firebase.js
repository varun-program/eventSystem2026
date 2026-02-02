import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD74CxOZrzIu2kVO5aD5G7VAqFYpBDVNpY",
  authDomain: "event-97a74.firebaseapp.com",
  projectId: "event-97a74",
  storageBucket: "event-97a74.firebasestorage.app",
  messagingSenderId: "467454908284",
  appId: "1:467454908284:web:4c0b484fbd6b6bbbd4f6f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);