import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FormInput from "./form-input";
import { Button } from "react-bootstrap";
import UploadBannerImage from "./upload-images";
import UploadClothImage from "./upload-clothing-image";
import AddBanner from "./dashboard-add-banner";

const TabsDashboard = () => {
  const [key, setKey] = useState("upload");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k: any) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="upload" title="Upload Image">
        <UploadBannerImage />
        <UploadClothImage />
      </Tab>
      <Tab eventKey="banner" title="Add Banner">
        <AddBanner />
      </Tab>
      <Tab eventKey="contact" title="Contact">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
};

export default TabsDashboard;
