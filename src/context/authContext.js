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
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const logOut = () => {
    signOut(auth);
    console.log("Sign Out Successfully");
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (user) => {
        //console.log(user.user.uid);
        try {
          const googleUserDocRef = doc(db, "users", user.user.uid);
          const docSnap = await getDoc(googleUserDocRef);
          if (docSnap.exists()) {
            //console.log("Document exists!");
            return null;
          } else {
            //console.log("Document doesn't exist!");
            await setDoc(googleUserDocRef, {
              userName: user.user.email,
              isAdmin: false,
              cart: [],
            });
          }
        } catch (error) {
          alert(error);
        }
      })
      .finally(() => route.push("/"));
  };

  const emailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        //console.log(user.user.uid);
        try {
          const userDocRef = doc(db, "users", user.user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            console.log("Document exists!");
            return null;
          } else {
            console.log("Document doesn't exist!");
            await setDoc(userDocRef, {
              userName: user.user.email,
              isAdmin: false,
              cart: [],
            });
          }
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
        route.push("/login");
      });
  };

  const emailSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Create Successfully");
        logOut();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        route.push("/login");
      });
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
  const context = useContext(AuthContext);
  return context;
};
