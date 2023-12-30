import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Image,
  Table,
  Card,
} from "react-bootstrap";
import FormInput from "../form-input";
import { useCart } from "@/context/cartContext";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CheckOutWithoutUser = () => {
  const { carts, totalCart } = useCart();
  const [cartList, setCartList] = useState([] as any);
  const [totalPriceCart, setTotalPriceCart] = useState<number>();
  const [comeAndTakeChecked, setComeAndTakeChecked] = useState<boolean>(true);
  const [codChecked, setCODChecked] = useState<boolean>(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = async () => {
    localStorage.setItem("lastname", lastName);
    localStorage.setItem("firstname", firstName);
    localStorage.setItem("address", address);
    localStorage.setItem("city", city);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    if (firstName && lastName && address && city && email && phone != "") {
      try {
        const billRef = collection(db, "order");
        const userData = {
          orderStatus: "pending",
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          email: email,
          phoneNumber: phone,
          cartItems: carts,
          billPrice: totalCart,
        };
        await addDoc(billRef, userData)
          .then(async (docRef) => {
            await updateDoc(docRef, {
              orderID: docRef.id,
            });
            const clientRef = collection(db, "client");
            const clientData = {
              firstName: firstName,
              lastName: lastName,
              address: address,
              city: city,
              email: email,
              phoneNumber: phone,
              clientID: "",
            };
            await addDoc(clientRef, clientData).then(async (docRef) => {
              await updateDoc(docRef, {
                clientID: docRef.id,
              });
            });
            toast.success("Order successfully", {
              onClose: () => {
                window.location.href = "/success-order";
              },
              closeOnClick: true,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (carts && totalCart) {
      setCartList(carts);
      setTotalPriceCart(totalCart);
    }
  }, [carts, totalCart]);

  return (
    <div className="div-90vh-pad10-flex">
      <Container style={{ marginTop: "10dvh" }}>
        <h2>Information</h2>
        <Row>
          <Col className="border-left-black">
            <Form
              style={{ display: "flex", width: "50dvw", marginTop: "5dvh" }}
            >
              <Row>
                <Col>
                  <Form.Control
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    placeholder="First Name"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    style={{ marginTop: "2dvh", marginBottom: "2dvh" }}
                    type="text"
                    placeholder="Address"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    placeholder="Phone"
                  />
                  <Button onClick={handleOrder}>Order Now</Button>
                </Col>
                <Col>
                  <Form.Control
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    placeholder="Last Name"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    style={{ marginTop: "2dvh", marginBottom: "2dvh" }}
                    type="text"
                    placeholder="Email"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    type="text"
                    placeholder="City"
                  />
                </Col>
              </Row>
            </Form>
            <div style={{ marginTop: "5dvh" }}>
              <h2>Shipping</h2>
              <div>
                <Form.Check
                  style={{ marginTop: "2dvh", marginBottom: "2dvh" }}
                  type="switch"
                  value={0}
                  onChange={(e) => setCODChecked(e.target.checked)}
                  id="switch-C-O-D"
                  label="Cash On Delivery"
                />
                <Form.Check
                  type="switch"
                  value={1}
                  onChange={(e) => setComeAndTakeChecked(e.target.checked)}
                  id="switch-come-and-take"
                  label="Take order at store"
                />
              </div>
            </div>
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
            <div>
              <Table responsive>
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckOutWithoutUser;
