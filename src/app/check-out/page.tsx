"use client";

import CheckOutWithUser from "@/components/check_out/check-out-with-user-page";
import CheckOutWithoutUser from "@/components/check_out/check-out-without-user-page";
import { UserAuth } from "@/context/authContext";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const CheckOutPage = () => {
  const { user } = UserAuth();

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);
  return <>{currentUser ? <CheckOutWithUser /> : <CheckOutWithoutUser />}</>;
};

export default CheckOutPage;
