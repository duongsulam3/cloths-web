import { useState } from "react";
import { Form } from "react-bootstrap";

const InputCheckbox = (props: any) => {
  const [selectedValue, setSelectedValue] = useState<string>(props.value || "");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckedSwitch = (e: any) => {
    if (isChecked == false) {
      setIsChecked(true);
      setSelectedValue(e.target.value);
      console.log(selectedValue);
      return;
    } else {
      setIsChecked(false);
      return;
    }
  };
  return (
    <>
      <Form.Check
        onChange={(e) => handleCheckedSwitch(e)}
        type="switch"
        id={props.value + "checkbox"}
        label={props.label}
        value={props.value}
        checked={isChecked}
      />
    </>
  );
};

export default InputCheckbox;
