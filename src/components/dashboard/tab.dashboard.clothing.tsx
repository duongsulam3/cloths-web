import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import AddBanner from "./add/dashboard-add-banner";
import UpdateAndDeleteTab from "./update_delete/update-delete-tab";
import UploadClothImage from "./upload/upload-clothing-image";
import AddClothing from "./add/dashboard-add-clothing";

const ClothingTab = () => {
  const [key, setKey] = useState("upload");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k: any) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="upload" title="Upload Image Cloth">
        <UploadClothImage />
      </Tab>
      <Tab eventKey="add" title="Add Cloth">
        <AddClothing />
      </Tab>
      <Tab eventKey="update/delete" title="Update/Delete Cloth">
        <UpdateAndDeleteTab />
      </Tab>
    </Tabs>
  );
};

export default ClothingTab;
