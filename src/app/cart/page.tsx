"use client";
import React from "react";
import { useCart } from "@/context/cartContext";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";

const Cart = () => {
  const { carts, removeFromCart } = useCart();

  const handleRemoveBtn = (idCart: any) => {
    removeFromCart(idCart);
  };

  return (
    <div className="div-90vh-10pad">
      <h2>Shopping Cart</h2>
      <Container>
        {carts.map((item: any, index: number) => {
          return (
            <div key={index} className="div-80vw-150h">
              <Col xs={10} style={{ display: "flex" }}>
                <Col xs={2}>
                  <Image
                    className="cart-item-img"
                    alt="thumbnail"
                    src={item.imgItem[0]}
                  />
                </Col>
                <Col xs={4}>
                  <p>{item.nameItem}</p>
                  <p>Size: {item.sizeItem}</p>
                </Col>
                <Col xs={1}>
                  <span className="span-margin-l-r-10">
                    {item.quantityItem}
                  </span>
                </Col>
                <Col xs={2}>
                  <span className="span-margin-l-r-10">{item.priceItem}</span>
                </Col>
              </Col>
              <Col>
                <Button onClick={() => handleRemoveBtn(item.idItem)}>
                  Remove From Cart
                </Button>
              </Col>
            </div>
          );
        })}
      </Container>
    </div>
  );
};

export default Cart;
