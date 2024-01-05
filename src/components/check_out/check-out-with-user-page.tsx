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
import { toast } from "react-toastify";

const CheckOutWithUser = () => {
  //
  const { user } = UserAuth();
  const { carts, totalCart } = useCart();

  const [cartList, setCartList] = useState([] as any);
  const [subTotalPriceCart, setSubTotalPriceCart] = useState<number>(0);
  const [cashOnDelivery, setCashOnDelivery] = useState<boolean>(false);
  const [comeAndTake, setComeAndTake] = useState<boolean>(false);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleOrder = async () => {
    localStorage.setItem("billPrice", totalPrice.toString());
    localStorage.setItem("shipping", shippingFee.toString());
    if (comeAndTake == false) {
      if (cashOnDelivery == false) {
        toast.error("You haven't select shipping method!");
        return;
      }
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
          shipping: shippingFee,
          billPrice: totalPrice,
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
    } else {
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
          shipping: shippingFee,
          billPrice: totalPrice,
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
    }
  };

  const handleCheckboxCOD = (e: any) => {
    if (e.target.checked) {
      setCashOnDelivery(e.target.checked);
      setShippingFee(15000);
      setComeAndTake(false);
    } else {
      setCashOnDelivery(false);
      setShippingFee(0);
      setComeAndTake(true);
    }
  };

  const handleCheckboxCAT = (e: any) => {
    if (e.target.checked) {
      setComeAndTake(e.target.checked);
      setCashOnDelivery(false);
      setShippingFee(0);
    } else {
      setComeAndTake(false);
      setCashOnDelivery(true);
      setShippingFee(15000);
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
      setSubTotalPriceCart(totalCart);
      setTotalPrice(totalCart + shippingFee);
    }
  }, [carts, user, totalCart, shippingFee]);

  return (
    <div className="div-90vh-pad10-flex">
      <Row style={{ marginTop: "5dvh" }}>
        <Col className="border-left-black">
          <h4>Information: {user.email}</h4>
          <Form style={{ width: "30dvw", alignItems: "start" }}>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              id={`input-firstName`}
              defaultValue={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Form.Label style={{ marginTop: "20px" }}>Last name</Form.Label>
            <Form.Control
              type="text"
              id={`input-lastName`}
              defaultValue={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Form.Label style={{ marginTop: "20px" }}>Address</Form.Label>
            <Form.Control
              type="text"
              id={`input-address`}
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Form.Label style={{ marginTop: "20px" }}>Phone</Form.Label>
            <Form.Control
              type="number"
              id={`input-phone`}
              defaultValue={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Form.Label style={{ marginTop: "20px" }}>City</Form.Label>
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
          <div style={{ marginTop: "5dvh" }}>
            <h2>Shipping</h2>
            <div>
              <Form.Check
                style={{ marginTop: "2dvh", marginBottom: "2dvh" }}
                type="switch"
                value={15000}
                checked={cashOnDelivery}
                onChange={(e) => handleCheckboxCOD(e)}
                id="switch-C-O-D"
                label="Cash On Delivery"
              />
              <Form.Check
                type="switch"
                value={0}
                checked={comeAndTake}
                onChange={(e) => handleCheckboxCAT(e)}
                id="switch-come-and-take"
                label="Take Orders At Store"
              />
            </div>
          </div>
        </Col>
        <Col>
          <Card
            style={{
              width: "30dvw",
              height: "fit-content",
              alignSelf: "end",
            }}
          >
            <Card.Header as="h4">In Your Cart</Card.Header>
            <Card.Body>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Subtotal</span>
                <span>{subTotalPriceCart}</span>
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Shipping</span>
                <span>{shippingFee}</span>
              </Card.Text>
              <Card.Text
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Total</span>
                <span>{totalPrice}</span>
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
