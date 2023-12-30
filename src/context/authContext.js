"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
} from "@firebase/auth";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "@firebase/auth/cordova";
import { useRouter } from "next/navigation";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const route = useRouter();
  const [user, setUser] = useState(null);

  const logOut = async () => {
    await signOut(auth);
  };

  const resetPassword = (newPassword) => {
    updatePassword(auth.currentUser, newPassword)
      .then(async () => {
        const userDocRef = doc(db, "users", user.userID);
        await updateDoc(userDocRef, {
          password: newPassword,
        });
        toast.success("Update password successful", {
          onClose: async () => {
            await signOut(auth);
            window.location.href = "/login";
          },
          closeOnClick: true,
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.log("Error: ", error.message);
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (user) => {
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
          window.location.href = "/";
        } else {
          //console.log("Document doesn't exist!");
          await setDoc(googleUserDocRef, {
            email: user.user.email,
            userID: user.user.uid,
            firstName: "null",
            lastName: "null",
            phoneNumber: user.user.phoneNumber ? "null" : user.user.phoneNumber,
            address: "null",
            city: "null",
            isAdmin: false,
            favoriteCloth: [],
          });
          window.location.href = "/";
        }
      } catch (error) {
        alert(error);
      }
    });
  };

  const emailSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        //console.log(user.user.uid);
        try {
          const userDocRef = doc(db, "users", user.user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap?.data();
            if (data?.isAdmin === true) {
              await logOut();
              toast.error("This account can not login here!");
              return;
            }
          }
          toast.success("Login successful", {
            onClose: () => {
              window.location.href = "/";
            },
            closeOnClick: true,
            autoClose: 3000,
          });
        } catch (error) {
          toast.error(error);
        }
      })
      .catch(() => {
        toast.error("Wrong password");
      });
  };

  const emailSignUp = (
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    address,
    city
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (user) => {
        try {
          const dataUser = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            city: city,
            email: email,
            password: password,
            isAdmin: false,
            favoriteCloth: [],
            userID: user.user.uid,
          };
          await setDoc(doc(db, "users", user.user.uid), dataUser);
          await logOut();
          toast.success("Create account successfully", {
            onClose: async () => {
              window.location.reload();
            },
            closeOnClick: true,
            autoClose: 2000,
          });
        } catch (error) {
          alert(error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const getUser = () => {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          onSnapshot(userDocRef, (doc) => {
            let data = doc?.data();
            const userDocID = data?.userID;
            if (currentUser.uid === userDocID) {
              setUser(data);
            }
            return;
          });
        } catch (error) {
          console.log(error);
        }
      };
      if (currentUser) {
        getUser();
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        googleSignIn,
        logOut,
        emailSignIn,
        emailSignUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
