"use client";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { UserAuth } from "./authContext";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";

const FavContext = createContext();

export const FavProvider = ({ children }) => {
  //User
  const { user } = UserAuth();

  //Route
  const route = useRouter();

  //Loading
  const [loading, setLoading] = useState(true);

  //Initial Fav List
  const [fav, setFav] = useState([]);

  useEffect(() => {
    if (user) {
      //console.log(user.uid);
      const fetchUserData = async (userID) => {
        try {
          const userCollectionRef = doc(db, "users", userID);
          const docSnap = await getDoc(userCollectionRef);
          const userData = docSnap?.data();
          const userFavList = userData?.favoriteCloth || [];
          if (userFavList.length >= 0) {
            setFav(userFavList);
            setLoading(false);
          } else {
            setFav([]);
            setLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData(user.uid);
    }
  }, [user]);

  //console.log(carts);

  const addToFav = async (item) => {
    const existingItem = fav.find((favItem) => favItem.itemID === item.itemID);
    if (existingItem) {
      alert("This item already in your list");
      route.push("/");
      return;
    } else {
      try {
        const updatedFav = [...fav, item];
        const userCollectionRef = doc(db, "users", user.uid);
        await updateDoc(userCollectionRef, {
          favoriteCloth: [...updatedFav],
        });
        setFav(updatedFav);
        route.push("/favorite");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromFav = (id) => {
    setFav((prevFav) => {
      const updatedFav = prevFav.filter((item) => item.idItem !== id);
      return updatedFav;
    });
    console.log(`removed item have id = ${id}`);
  };

  // if (!userCart) {
  //   return <div>Loading...</div>;
  // }

  return (
    <FavContext.Provider
      value={{ user, loading, fav, addToFav, removeFromFav }}
    >
      {children}
    </FavContext.Provider>
  );
};

export const useFav = () => {
  const context = useContext(FavContext);
  return context;
};
