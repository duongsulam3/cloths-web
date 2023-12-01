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

  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        alert("Logout Successfully");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.href = "/";
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (user) => {
        //console.log(user.user.uid);
        try {
          const googleUserDocRef = doc(db, "users", user.user.uid);
          const docSnap = await getDoc(googleUserDocRef);
          const data = docSnap?.data();
          const userFavList = data?.favoriteCloth;
          if (docSnap.exists()) {
            //console.log("Document exists!");
            await setDoc(googleUserDocRef, {
              ...data,
              favoriteCloth: [...userFavList],
            });
          } else {
            //console.log("Document doesn't exist!");
            await setDoc(googleUserDocRef, {
              userName: user.user.email,
              isAdmin: false,
              favoriteCloth: [],
            });
          }
        } catch (error) {
          alert(error);
        }
      })
      .finally(() => (window.location.href = "/"));
  };

  const emailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        //console.log(user.user.uid);
        try {
          const userDocRef = doc(db, "users", user.user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            // console.log("Document exists!");
            const data = docSnap?.data();
            const userFavList = data?.favoriteCloth;
            if (userFavList === null) {
              window.location.href = "/dashboard";
              return;
            }
            await setDoc(userDocRef, {
              ...data,
              favoriteCloth: [...userFavList],
            });
          } else {
            // console.log("Document doesn't exist!");
            await setDoc(userDocRef, {
              userName: user.user.email,
              isAdmin: false,
              favoriteCloth: [],
            });
          }
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
        route.push("/login");
        return null;
      });
  };

  const emailSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        logOut();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        window.location.href = "/";
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
