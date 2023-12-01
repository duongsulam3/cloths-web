"use client";
import IsAdminDashboard from "@/components/is-admin-dashboard";
import { UserAuth } from "@/context/authContext";
import { Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const { user } = UserAuth();
  return (
    <>
      {user === null ? (
        <div className="div-90vh-pad10-flex">
          <Spinner></Spinner>
        </div>
      ) : user.uid === "z5savCUqJ3ZYI1m2jjUf0f3Rdi33" ? (
        <IsAdminDashboard />
      ) : (
        <div className="div-90vh-pad10-flex">
          <p>Cút</p>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
