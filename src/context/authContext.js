"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "@firebase/auth/cordova";
import { useRouter } from "next/navigation";
import { resolve } from "path";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const emailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      resolve("/");
      //route.push("/");
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
