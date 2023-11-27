"use client";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { UserAuth } from "./authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //User
  const { user } = UserAuth();

  //Local Storage
  let storedCarts;

  //handle if Client === undefined
  const isClient = typeof window !== "undefined";
  if (isClient) {
    try {
      storedCarts = JSON.parse(localStorage.getItem("carts") || []);
    } catch (error) {
      console.log(error);
      storedCarts = [];
    }
  } else storedCarts = [];

  const [carts, setCarts] = useState(storedCarts);
  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));

    const updateCartCounter = () => {
      const counter = carts.reduce(
        (counter, item) => counter + item.quantityItem,
        0
      );
      setCartCounter(counter);
    };
    updateCartCounter();
  }, [carts, user]);

  //console.log(carts);

  const addToCart = (item) => {
    setCarts((prevCart) => {
      //Check if it has the same idItem
      const existingItem = prevCart.find(
        (existingCartItem) => existingCartItem.idItem === item.idItem
      );
      if (existingItem) {
        const updatedCart = prevCart.map((cartItem) => {
          if (cartItem.idItem === item.idItem) {
            let quantityInCart = cartItem.quantityItem + item.quantityItem;
            console.log(`Added duplicate item`);
            return {
              ...cartItem,
              quantityItem: quantityInCart,
              totalPriceItem: cartItem.priceItem * quantityInCart,
            };
          }
          return cartItem;
        });
        localStorage.setItem("carts", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const newCart = [...prevCart, item];
        localStorage.setItem("carts", JSON.stringify(newCart));
        console.log(`Added`);
        return newCart;
      }
    });
  };

  const removeFromCart = (id) => {
    setCarts((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idItem !== id);
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`removed item have id = ${id}`);
  };

  // if (!userCart) {
  //   return <div>Loading...</div>;
  // }

  return (
    <CartContext.Provider
      value={{ carts, cartCounter, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
