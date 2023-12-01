import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormInput from "./form-input";

const AddClothing = () => {
  const [nameCloth, setNameCloth] = useState("");
  const [priceCloth, setPriceCloth] = useState(0);
  const [oldPriceCloth, setOldPriceCloth] = useState(0);
  const [salePercentCloth, setSalePercentCloth] = useState("");
  const [soldCloth, setSoldCloth] = useState(0);
  const [keySearchCloth, setKeySearchCloth] = useState("");
  const [imgCloth, setImgCloth] = useState("");
  const [idCloth, setIDCloth] = useState("");
  const [currencyCloth, setCurrencyCloth] = useState("");
  const [descriptionCloth, setDescriptionCloth] = useState("");
  const [cateCloth, setCateCloth] = useState("");

  const handleSubmit = () => {
    null;
  };

  return (
    <>
      <FormInput title="Cloth's Name" type="text" sharedValue={setNameCloth} />

      <FormInput
        title="Cloth's Sale Percent"
        type="text"
        sharedValue={setSalePercentCloth}
      />

      <FormInput
        title="Cloth's Key Searching"
        type="text"
        sharedValue={setKeySearchCloth}
      />
      <FormInput title="Cloth's Images" type="url" sharedValue={setImgCloth} />
      <FormInput title="Cloth's ID" type="text" sharedValue={setIDCloth} />
      <FormInput
        title="Cloth's Description"
        type="text"
        sharedValue={setDescriptionCloth}
      />
      <FormInput
        title="Cloth's Currency"
        type="text"
        sharedValue={setCurrencyCloth}
      />
      <FormInput
        title="Cloth's Category"
        type="text"
        sharedValue={setCateCloth}
      />

      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default AddClothing;
