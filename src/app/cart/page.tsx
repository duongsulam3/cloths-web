"use client";
import React from "react";
import { useCart } from "@/context/cartContext";
import { Button, Image } from "react-bootstrap";

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
            <Image
              roundedCircle
              className="cart-item-img"
              alt="thumbnail"
              src={item.imgItem[0]}
            />
            Size: {item.sizeItem} {item.nameItem} - ${item.priceItem} x{" "}
            {item.quantityItem} = {item.totalPriceItem}
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
