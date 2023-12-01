import { useState } from "react";
import FormInput from "./form-input";
import { Button, Form } from "react-bootstrap";
import UploadImages from "./upload-images";
import TabsDashboard from "./tabs-dashborad";

const IsAdminDashboard = () => {
  return (
    <div className="div-90vh-pad10-flex">
      <h2>Admin Dashboard</h2>
      <TabsDashboard />
    </div>
  );
};

export default IsAdminDashboard;
