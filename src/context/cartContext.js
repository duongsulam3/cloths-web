"use client";
import { type } from "os";
import { useState, useContext } from "react";
import { createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);

  const addToCart = (item) => {
    setCarts((prevCart) => [...prevCart, item]);
  };

  // const removeFromCart = (id) => {
  //   setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  // };

  return (
    <CartContext.Provider value={{ carts, addToCart }}>
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
