"use client";
import React from "react";
import { useCart } from "@/context/cartContext";

const Cart = () => {
  const { carts } = useCart();
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {carts.map((item: any) => (
          <li key={item.idCart}>
            {item.nameCart} - ${item.priceCart} x {item.quantityCart} ={" "}
            {item.totalPrice}
            <button>Remove from Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
