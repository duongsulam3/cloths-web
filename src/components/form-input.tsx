import { useRef, useState } from "react";
import { Form } from "react-bootstrap";

interface IPros {
  title: string;
  type: string;
  sharedValue: React.Dispatch<React.SetStateAction<string>>;
}
const FormInput = (props: IPros) => {
  const inputElement = useRef(null);
  const [value, setValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.sharedValue(e.target.value);
  };
  return (
    <>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        className="input-30vw"
        autoCapitalize="true"
        autoComplete="true"
        type={props.type}
        ref={inputElement}
        name={props.title}
        value={value}
        onChange={handleInputChange}
      />
    </>
  );
};

export default FormInput;
