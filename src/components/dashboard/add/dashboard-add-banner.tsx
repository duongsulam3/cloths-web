import { useState } from "react";
import FormInput from "../../form-input";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  addDoc,
  collection,
  doc,
  documentId,
  setDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const AddBanner = () => {
  const [caption, setCaption] = useState("");
  const [imgURL, setImgURL] = useState("");

  const handleSubmit = async () => {
    try {
      const bannerCollectionRef = collection(db, "banner");
      const bannerData = {
        caption: caption,
        img: imgURL,
      };
      await addDoc(bannerCollectionRef, bannerData)
        .then((docRef) => {
          setDoc(docRef, {
            ...bannerData,
            idBanner: docRef.id,
          });
        })
        .finally(() => {
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
