"use client";

import CheckOutWithUser from "@/components/check-out-with-user-page";
import CheckOutWithoutUser from "@/components/check-out-without-user-page";
import { UserAuth } from "@/context/authContext";

const CheckOutPage = () => {
  const { user } = UserAuth();
  return <>{user ? <CheckOutWithUser /> : <CheckOutWithoutUser />}</>;
};

export default CheckOutPage;
