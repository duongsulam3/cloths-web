import { UserAuth } from "@/context/authContext";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import FormInput from "./form-input";
import { Button, Form } from "react-bootstrap";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

const CheckOutWithUser = () => {
  //
  const { user } = UserAuth();
  const { carts, totalCart } = useCart();

  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = async () => {
    try {
      const billRef = collection(db, "bills");
      const userData = {
        userID: user.uid,
        userEmail: user.email,
        userName: userName,
        userAddress: address,
        userPhoneNumber: phone,
        cartItems: carts,
        billPrice: totalCart,
      };
      await addDoc(billRef, userData)
        .then((docRef) => {
          console.log(docRef.id);
        })
        .catch((error) => {
          console.log(error);
          return null;
        })
        .finally(() => {
          console.log("Order successfully");
          localStorage.clear();
          window.location.href = "/success-order";
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="div-90vh-pad10-flex">
      <h1>Hello, {user.email}</h1>
      <Form>
        <FormInput title="Name" type="text" sharedValue={setUserName} />
        <FormInput title="Address" type="text" sharedValue={setAddress} />
        <FormInput title="Phone Number" type="tel" sharedValue={setPhone} />
      </Form>
      <Button onClick={handleOrder}>Order Now</Button>
    </div>
  );
};

export default CheckOutWithUser;
