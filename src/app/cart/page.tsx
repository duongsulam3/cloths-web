"use client";
import React from "react";
import { useCart } from "@/context/cartContext";
import { Button, Col, Container, Image } from "react-bootstrap";

const Cart = () => {
  const { carts, removeFromCart } = useCart();
  // console.log(carts);

  const isEmptyCart = carts.length === 0;
  let totalCart = 0;

  const handleRemoveBtn = (idCart: any) => {
    removeFromCart(idCart);
  };

  return (
    <div className="div-90vh-10pad">
      {isEmptyCart ? (
        <div className="empty-cart-message">
          <h2>Empty Cart</h2>
          <p>Please add cloths to your cart</p>
        </div>
      ) : (
        <Container>
          <h2>Shopping Cart</h2>
          {carts.map((item: any, index: number) => {
            //console.log(index);
            totalCart += item.totalPriceItem;
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
                  <Col xs={4} className="col-center-text">
                    <p>{item.nameItem}</p>
                    <p>Size: {item.sizeItem}</p>
                    <p>Price: {item.priceItem}</p>
                  </Col>
                  <Col xs={4} className="col-center-text">
                    <span>Quantity: {item.quantityItem}</span>
                  </Col>

                  <Col className="col-center-text">
                    <span>Total: {item.totalPriceItem}</span>
                  </Col>
                </Col>
                <Col className="col-pad-right-10">
                  <Button onClick={() => handleRemoveBtn(item.idItem)}>
                    Remove From Cart
                  </Button>
                </Col>
              </div>
            );
          })}
          <div className="total-price-container">
            <h2>Total Price: {totalCart}</h2>
            <Button>Check out</Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Cart;
