"use client";
import React from "react";
import { useCart } from "@/context/cartContext";
import {
  Button,
  Col,
  Container,
  Image,
  Table,
  Card,
  Row,
} from "react-bootstrap";
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { carts, cartCounter, totalCart, removeFromCart } = useCart();
  const { user } = UserAuth();
  const route = useRouter();

  const isEmptyCart = cartCounter == 0;

  const handleRemoveBtn = (index: number) => {
    removeFromCart(index);
  };

  const handleCheckOut = () => {
    route.push("/check-out");
  };

  return (
    <div className="div-90vh-10pad">
      {isEmptyCart ? (
        <div className="empty-cart-message">
          <h2>Empty Cart</h2>
          <p>Please add cloths to your cart</p>
        </div>
      ) : (
        <Container style={{ paddingTop: "10dvh" }}>
          <h2>Shopping Cart</h2>
          <div style={{ display: "flex" }}>
            <div style={{ width: "60dvw" }}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th></th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item: any, i: number) => {
                    return (
                      <tr style={{ verticalAlign: "middle" }} key={i}>
                        <td>
                          <Image
                            style={{
                              height: "96px",
                              width: "96px",
                              borderRadius: "10px",
                            }}
                            alt="thumbnail"
                            src={item.imgItem[0]}
                          />
                        </td>
                        <td>
                          <p>{item.nameItem}</p>
                          <p>Size: {item.sizeItem}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p>{item.quantityItem}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p>{item.priceItem}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <p>{item.totalPriceItem}</p>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Button
                            style={{
                              display: "flex",
                              backgroundColor: "transparent",
                              color: "black",
                              borderColor: "transparent",
                            }}
                            onClick={() => handleRemoveBtn(i)}
                          >
                            <p className="material-icons">delete</p>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            <Card
              style={{
                width: "20dvw",
                marginLeft: "5dvw",
                height: "fit-content",
              }}
            >
              <Card.Header as="h4">Summary</Card.Header>
              <Card.Body>
                <Card.Text
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Subtotal</span>
                  <span>{totalCart} VND</span>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  style={{ width: "-webkit-fill-available" }}
                  onClick={handleCheckOut}
                >
                  Go to checkout
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Cart;
