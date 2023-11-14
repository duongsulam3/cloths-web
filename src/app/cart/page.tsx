"use client";
import React from "react";
import { useCart } from "@/context/cartContext";
import { Button } from "react-bootstrap";

const Cart = () => {
  const { carts, removeFromCart } = useCart();

  const handleRemoveBtn = (idCart: any) => {
    removeFromCart(idCart);
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {carts.map((item: any, index: any) => (
          <li key={index}>
            {item.nameCart} - ${item.priceCart} x {item.quantityCart} ={" "}
            {item.totalPrice}
            <Button onClick={() => handleRemoveBtn(item.idCart)}>
              Remove This Item
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
