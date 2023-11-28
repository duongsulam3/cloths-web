import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "./form-input";
import { useCart } from "@/context/cartContext";

const CheckOutWithoutUser = () => {
  const { carts, totalCart } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleOrder = () => {
    console.log(
      `firstName: ${firstName}, lastName: ${lastName}, address: ${address}, phone: ${phone}, carts: ${carts}, totalCart: ${totalCart}`
    );
    return null;
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
