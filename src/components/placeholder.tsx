import "@/styles/app.scss";
import { Container, Spinner } from "react-bootstrap";
const CardPlaceHolder = () => {
  return (
    <Container fluid className="card-placeholder">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};

export default CardPlaceHolder;
