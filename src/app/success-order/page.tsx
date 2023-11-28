"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const SuccessOrderPage = () => {
  const handleBtn = () => {
    window.location.href = "/";
  };
  return (
    <div className="div-90vh-pad10-flex-center-item">
      <h1>Thank you for your order</h1>
      <p>Your order is well taking</p>
      <Button onClick={handleBtn}>Continue Shopping</Button>
    </div>
  );
};

export default SuccessOrderPage;
