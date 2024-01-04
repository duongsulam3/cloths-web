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
  const [subTotalPriceCart, setSubTotalPriceCart] = useState<number>(0);
  const [cashOnDelivery, setCashOnDelivery] = useState<boolean>(false);
  const [comeAndTake, setComeAndTake] = useState<boolean>(false);
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
    localStorage.setItem("billPrice", totalPrice);
    if (firstName && lastName && address && city && email && phone != "") {
      if (comeAndTake === false) {
        if (cashOnDelivery === false) {
          toast.error("You haven't select shipping method!");
          return;
        } else {
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
              billPrice: totalPrice,
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
        }
      } else {
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
            billPrice: totalPrice,
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
      }
    } else {
      toast.error("Please fill out empty fields!");
      return;
    }
  };

  const handleCheckboxCOD = (e) => {
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

  const handleCheckboxCAT = (e) => {
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
    if (carts && totalCart) {
      setCartList(carts);
      setSubTotalPriceCart(totalCart);
      setTotalPrice(totalCart + shippingFee);
    }
  }, [carts, totalCart, shippingFee]);

  return (
    <div className="div-90vh-pad10-flex">
      <Container style={{ marginTop: "10dvh" }}>
        <h2>Information</h2>
        <Row>
          <Col className="border-left-black">
            <Form
              style={{
                display: "flex",
                marginTop: "5dvh",
                width: "100%",
                alignItems: "start",
              }}
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
                    style={{
                      marginTop: "2dvh",
                      marginBottom: "2dvh",
                    }}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    placeholder="Last Name"
                  />

                  <Form.Control
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    placeholder="Phone"
                  />
                </Col>
                <Col>
                  <Form.Control
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="text"
                    placeholder="Email"
                  />
                  <Form.Control
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    style={{
                      marginTop: "2dvh",
                      marginBottom: "2dvh",
                    }}
                    type="text"
                    placeholder="Address"
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
              <Button onClick={handleOrder}>Order Now</Button>
            </Form>
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
          <Col style={{ display: "flex", flexDirection: "column" }}>
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
                  <span>{subTotalPriceCart} VND</span>
                </Card.Text>
                <Card.Text
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Shipping</span>
                  <span>{shippingFee} VND</span>
                </Card.Text>
                <Card.Text
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Total</span>
                  <span>{totalPrice} VND</span>
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
