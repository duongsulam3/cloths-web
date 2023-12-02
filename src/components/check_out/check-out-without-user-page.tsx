import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "../form-input";
import { useCart } from "@/context/cartContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";

const CheckOutWithoutUser = () => {
  const { carts, totalCart } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = async () => {
    try {
      const billRef = collection(db, "billWithNoUser");
      const userData = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phoneNumber: phone,
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
          console.log("Your order is well taking");
          localStorage.clear();
          window.location.href = "/success-order";
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="div-90vh-pad10-flex">
      <h1>Order Information</h1>

      <Form>
        <FormInput title="First Name" type="text" sharedValue={setFirstName} />
        <FormInput title="Last Name" type="text" sharedValue={setLastName} />
        <FormInput title="Address" type="text" sharedValue={setAddress} />
        <FormInput title="Phone Number" type="tel" sharedValue={setPhone} />
      </Form>
      <Button onClick={handleOrder}>Order Now</Button>
    </div>
  );
};

export default CheckOutWithoutUser;
