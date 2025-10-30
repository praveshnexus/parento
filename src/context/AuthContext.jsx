// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Sign up with email and password
  async function signup(email, password, fullName, phone) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      await updateProfile(result.user, {
        displayName: fullName
      });

      // Create user document in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: email,
        fullName: fullName,
        phone: phone || "",
        photoURL: "", // Will use generated avatar
        createdAt: serverTimestamp(),
        role: "parent",
        children: [],
        settings: {
          notifications: true,
          emailUpdates: true
        },
        stats: {
          postsCount: 0,
          milestonesCompleted: 0,
          consultationsBooked: 0
        }
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with email and password
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google
  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, "users", result.user.uid));
      
      // If new user, create document
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          fullName: result.user.displayName,
          phone: "",
          photoURL: result.user.photoURL || "", // Google provides photo, but we can override with generated avatar
          createdAt: serverTimestamp(),
          role: "parent",
          children: [],
          settings: {
            notifications: true,
            emailUpdates: true
          },
          stats: {
            postsCount: 0,
            milestonesCompleted: 0,
            consultationsBooked: 0
          }
        });
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Reset password
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Fetch user data from Firestore
  async function fetchUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        return userDoc.data();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  // Update user data
  async function updateUserData(uid, data) {
    try {
      await setDoc(doc(db, "users", uid), data, { merge: true });
      await fetchUserData(uid);
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    updateUserData,
    fetchUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}