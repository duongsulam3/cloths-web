"use client";

import CheckOutWithUser from "@/components/check-out-with-user-page";
import CheckOutWithoutUser from "@/components/check-out-without-user-page";
import { UserAuth } from "@/context/authContext";
import { Spinner } from "react-bootstrap";

const CheckOutPage = () => {
  const { user, loading } = UserAuth();
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : user ? (
        <CheckOutWithUser />
      ) : (
        <CheckOutWithoutUser />
      )}
    </>
  );
};

export default CheckOutPage;
