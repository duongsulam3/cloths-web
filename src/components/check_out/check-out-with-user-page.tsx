import { UserAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import FormInput from "../form-input";
import {
  Button,
  Form,
  FloatingLabel,
  Row,
  Col,
  Card,
  Table,
  Image,
} from "react-bootstrap";
import { db } from "@/config/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";

const CheckOutWithUser = () => {
  //
  const { user } = UserAuth();

  const { carts, totalCart } = useCart();

  const [cartList, setCartList] = useState([] as any);
  const [totalPriceCart, setTotalPriceCart] = useState<number>();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = async () => {
    try {
      const billRef = collection(db, "orderWithUser");
      const userData = {
        orderStatus: "pending",
        userID: user.userID,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        phoneNumber: phone,
        cartItems: carts,
        billPrice: totalCart,
      };
      await addDoc(billRef, userData)
        .then(async (docRef) => {
          await updateDoc(docRef, {
            orderID: docRef.id,
          });
          console.log("Order successfully");
          window.location.href = "/success-order";
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setCity(user.city);
      setPhone(user.phoneNumber);
    }
    if (carts && totalCart) {
      setCartList(carts);
      setTotalPriceCart(totalCart);
    }
  }, [carts, user, totalCart]);

  return (
    <div className="div-90vh-pad10-flex">
      <Row style={{ marginTop: "5dvh" }}>
        <Col className="border-left-black">
          <h4>Information: {user.email}</h4>
          <Form style={{ width: "30dvw" }}>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              id={`input-firstName`}
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              id={`input-lastName`}
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              id={`input-address`}
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              id={`input-phone`}
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              id={`input-city`}
              defaultValue={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form>
          <Button style={{ width: "30dvw" }} onClick={handleOrder}>
            Order Now
          </Button>
        </Col>
        <Col>
          <Card
            style={{
              width: "20dvw",
              marginLeft: "5dvw",
              height: "fit-content",
            }}
          >
            <Card.Header as="h4">In Your Cart</Card.Header>
            <Card.Body>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Subtotal</span>
                <span>{totalPriceCart}</span>
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Shipping</span>
                <span>0</span>
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Total</span>
                <span>{totalPriceCart}</span>
              </Card.Text>
            </Card.Body>
          </Card>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((item: any, i: number) => {
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
                      <p>{item.sizeItem}</p>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <p>{item.quantityItem}x</p>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <p>{item.totalPriceItem}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default CheckOutWithUser;
