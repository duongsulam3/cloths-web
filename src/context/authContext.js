"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "@firebase/auth/cordova";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        console.log(user.user.uid);
        try {
          const userDocRef = doc(db, "users", user.user.uid);
          await setDoc(userDocRef, {
            userName: user.user.email,
            isAdmin: false,
            cart: [],
          });
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
        route.push("/login");
        if (!error) {
          alert("Login Successfully");
          window.location.assign("/");
        }
      });
  };

  const emailSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Create Successfully");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.assign("/");
      });
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, logOut, emailSignIn, emailSignUp }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
