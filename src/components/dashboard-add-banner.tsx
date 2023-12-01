import { useState } from "react";
import FormInput from "./form-input";
import { Button, Col, Form, Row } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import AddClothing from "./dashboard-add-clothing";

const AddBanner = () => {
  const [caption, setCaption] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleSubmit = async () => {
    // console.log(caption, imgURL);
    try {
      const bannerCollectionRef = collection(db, "banner");
      const bannerData = {
        caption: caption,
        img: imgURL,
      };
      await addDoc(bannerCollectionRef, bannerData).then(() => {
        alert("Added");
        setCaption(""), setImgURL("");
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <FormInput title="Banner Caption" type="text" sharedValue={setCaption} />
      <FormInput title="Image URL" type="url" sharedValue={setImgURL} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default AddBanner;
