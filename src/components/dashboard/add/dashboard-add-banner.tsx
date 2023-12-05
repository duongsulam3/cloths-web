import { useState } from "react";
import FormInput from "../../form-input";
import { Button } from "react-bootstrap";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "react-toastify";

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
        .then(async (docRef) => {
          try {
            await setDoc(docRef, {
              ...bannerData,
              idBanner: docRef.id,
            });
          } catch (error) {
            console.error(error);
          }
        })
        .then(() => {
          toast.success("Banner added successful"),
            setCaption(""),
            setImgURL(""),
            setTimeout(() => {
              window.location.reload();
            }, 6000);
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
