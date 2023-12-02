"use client";
import IsAdminDashboard from "@/components/dashboard/is-admin-dashboard";
import { UserAuth } from "@/context/authContext";

const AdminDashboard = () => {
  //User
  const { user } = UserAuth();

  return (
    <>
      {user === null ? (
        <div className="div-90vh-pad10-flex">
          <h1>You have to login as Admin to use this feature</h1>
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
