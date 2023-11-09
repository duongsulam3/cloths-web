"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "@firebase/auth/cordova";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      route.push("/");
    });
    return () => unsubscribe();
  }, [route, user]);
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
