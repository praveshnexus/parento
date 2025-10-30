// src/firebase/firebase.js
import { initializeApp } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔥 REPLACE THIS WITH YOUR ACTUAL FIREBASE CONFIG
// (The one you saved from Step 2.3 in Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAU0DTg8uFmychceSICqXytNDOU6yDBhT8",
  authDomain: "parento-a4900.firebaseapp.com",
  projectId: "parento-a4900",
  storageBucket: "parento-a4900.firebasestorage.app",
  messagingSenderId: "790784873741",
  appId: "1:790784873741:web:260865868b5ce30dbb8c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;