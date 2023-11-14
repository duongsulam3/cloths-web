"use client";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const isClient = typeof window !== "undefined";
  let storedCarts;

  //handle if Client === undefined
  if (isClient) {
    try {
      storedCarts = JSON.parse(localStorage.getItem("carts") || []);
    } catch (error) {
      storedCarts = [];
    }
  } else storedCarts = [];

  const [carts, setCarts] = useState(storedCarts);

  const addToCart = (item) => {
    setCarts((prevCart) => {
      const newCart = [...prevCart, item];
      localStorage.setItem("carts", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id) => {
    setCarts((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.idCart !== id);
      localStorage.setItem("carts", JSON.stringify(updatedCart));
      return updatedCart;
    });
    console.log(`removed item have id = ${id}`);
  };

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(carts));
  }, [carts]);

  return (
    <CartContext.Provider value={{ carts, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
