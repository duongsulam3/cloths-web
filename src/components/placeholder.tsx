import "@/styles/app.scss";
import { Card, Placeholder } from "react-bootstrap";
const PlaceHolder = () => {
  return (
    <Card
      style={{
        paddingLeft: "0",
        paddingRight: "0",
      }}
    >
      <Card.Img variant="top" />
      <Card.Body className="card-body d-flex flex-column">
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default PlaceHolder;
