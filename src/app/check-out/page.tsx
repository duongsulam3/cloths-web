"use client";

import CheckOutWithUser from "@/components/check_out/check-out-with-user-page";
import CheckOutWithoutUser from "@/components/check_out/check-out-without-user-page";
import { UserAuth } from "@/context/authContext";
import { Spinner } from "react-bootstrap";

const CheckOutPage = () => {
  const { user } = UserAuth();
  return <>{user ? <CheckOutWithUser /> : <CheckOutWithoutUser />}</>;
};

export default CheckOutPage;