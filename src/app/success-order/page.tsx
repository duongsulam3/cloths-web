"use client";
import { Button, Table, Image, Card, Row, Col } from "react-bootstrap";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/authContext";

const SuccessOrderPage = () => {
  const { user } = UserAuth();
  const { carts } = useCart();
  const [firstName, setFirstName] = useState<string | "">("");
  const [lastName, setLastName] = useState<string | "">("");
  const [address, setAddress] = useState<string | "">("");
  const [city, setCity] = useState<string | "">("");
  const [email, setEmail] = useState<string | "">("");
  const [phone, setPhone] = useState<string | "">("");
  const [totalReceipt, setTotalReceipt] = useState<number | 0>(0);
  const [cartList, setCartList] = useState([] as any);

  const handleBtn = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    setTotalReceipt(localStorage.getItem("billPrice"));
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setCity(user.city);
      setEmail(user.email);
      setPhone(user.phoneNumber);
      return;
    } else {
      setFirstName(localStorage.getItem("firstname"));
      setLastName(localStorage.getItem("lastname"));
      setAddress(localStorage.getItem("address"));
      setCity(localStorage.getItem("city"));
      setEmail(localStorage.getItem("email"));
      setPhone(localStorage.getItem("phone"));
    }
    if (carts) {
      setCartList(carts);
    }
  }, [carts, user]);

  return (
    <div className="div-90vh-pad10-flex-center-item">
      <div>
        <h1>Thank you!</h1>
        <p>Your order was placed successfully</p>
        <div
          style={{
            display: "flex",
            marginTop: "5dvh",
            padding: "2dvh",
            border: "1px solid black",
          }}
        >
          <div style={{ width: "60dvw" }}>
            <h4>Your Receipt</h4>
            <Row>
              <Col>
                <p>First name: </p>
                <p>Last name: </p>
                <p>Address: </p>
                <p>City: </p>
                <p>Phone number: </p>
                <p>Email address: </p>
              </Col>
              <Col>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{address}</p>
                <p>{city}</p>
                <p>{phone}</p>
                <p>{email}</p>
              </Col>
            </Row>
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Item</th>
                  <th style={{ textAlign: "center" }}>Quantity</th>
                  <th style={{ textAlign: "center" }}>Size</th>
                  <th style={{ textAlign: "center" }}>Price</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartList.map((item: any, i: number) => {
                  return (
                    <tr key={i} style={{ verticalAlign: "middle" }}>
                      <td>{i + 1}</td>
                      <td>{item.nameItem}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.quantityItem}
                      </td>
                      <td style={{ textAlign: "center" }}>{item.sizeItem}</td>
                      <td style={{ textAlign: "center" }}>{item.priceItem}</td>
                      <td style={{ textAlign: "center" }}>
                        {item.totalPriceItem}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div>Total Receipt: {totalReceipt} VND</div>
          </div>
        </div>
      </div>
      <Button style={{ marginTop: "1dvh" }}>Print</Button>
      <Button style={{ marginTop: "1dvh" }} onClick={handleBtn}>
        Continue Shopping
      </Button>
    </div>
  );
};

export default SuccessOrderPage;
