import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UploadBannerImage from "./upload/upload-images";
import UploadClothImage from "./upload/upload-clothing-image";
import AddBanner from "./add/dashboard-add-banner";
import UpdateAndDeleteTab from "./update_delete/update-delete-tab";

const BannerTab = () => {
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
      </Tab>
      <Tab eventKey="add" title="Add Banner">
        <AddBanner />
      </Tab>
      <Tab eventKey="update/delete" title="Update/Delete Banner">
        <UpdateAndDeleteTab />
      </Tab>
    </Tabs>
  );
};

export default BannerTab;