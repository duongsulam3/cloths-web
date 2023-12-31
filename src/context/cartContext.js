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
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
    const updateCartCounter = () => {
      const counter = carts.reduce(
        (counter, item) => counter + item.quantityItem,
        0
      );
      setCartCounter(counter);
    };

    const updateTotalCart = () => {
      const counter = carts.reduce(
        (counter, item) => counter + item.totalPriceItem,
        0
      );
      setTotalCart(counter);
    };

    updateCartCounter();
    if (carts.length > -1) {
      updateTotalCart();
    }
  }, [carts]);

  //console.log(carts);

  const addToCart = (item) => {
    setCarts((prevCart) => {
      //Check if it has the same idItem
      const existingItem = prevCart.find(
        (existingCartItem) => existingCartItem.idItem === item.idItem
      );
      if (existingItem) {
        if (existingItem.sizeItem === item.sizeItem) {
          const updatedCart = prevCart.map((cartItem) => {
            if (cartItem.idItem === item.idItem) {
              let quantityInCart = cartItem.quantityItem + item.quantityItem;
              // console.log(`Added duplicate item`);
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
          return newCart;
        }
      } else {
        const newCart = [...prevCart, item];
        localStorage.setItem("carts", JSON.stringify(newCart));
        // console.log(`Added`);
        return newCart;
      }
    });
  };

  const removeFromCart = (indexSelected) => {
    setCarts((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart.splice(indexSelected, 1);
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // if (!userCart) {
  //   return <div>Loading...</div>;
  // }

  return (
    <CartContext.Provider
      value={{ carts, cartCounter, totalCart, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
