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
    <div className="div-90vh-10pad">
      <h2>Cart</h2>
      <ul>
        {carts.map((item: any, index: any) => (
          <li key={index}>
            {item.nameItem} - ${item.priceItem} x {item.quantityItem} ={" "}
            {item.totalPriceItem}
            <Button onClick={() => handleRemoveBtn(item.idItem)}>
              Remove This Item
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
