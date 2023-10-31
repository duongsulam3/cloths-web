import { Form } from "react-bootstrap";

const Filter = () => {
  return (
    <>
      <h2>Filter</h2>
      <Form>
        <Form.Check // prettier-ignore
          type={`checkbox`}
          id={`checkbox-price`}
          label={`Price <= 500000`}
        />
        <Form.Check type={`checkbox`} id={`checkbox-sale`} label={`Sale`} />
      </Form>
    </>
  );
};

export default Filter;
