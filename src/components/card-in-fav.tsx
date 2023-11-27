"use client";
import { Cloth } from "@/types/backend";
import Card from "react-bootstrap/Card";
import "@/styles/app.scss";
import { Row, Col, Button, CardFooter } from "react-bootstrap";
import Link from "next/link";
import { useFav } from "@/context/favContext";

interface IPros {
  cloths: Cloth[];
}

const CardInFav = (props: IPros) => {
  const { cloths } = props;
  const { removeFromFav } = useFav();

  const handleRemoveFav = (id: string) => {
    removeFromFav(id);
  };

  return (
    <Row xs={1} sm={2} md={4} className="g-3">
      {cloths?.map((cloth, index) => {
        return (
          <Col key={index}>
            <Link className="card-link" href={`/cloths/${cloth.idCloth}`}>
              <Card className="card-padding-l-r-0">
                <Card.Img variant="top" src={cloth.img[0]} />
                <Card.ImgOverlay>
                  <span className="material-icons">favorite</span>
                </Card.ImgOverlay>
                <Card.Body className="card-body d-flex flex-column">
                  <Card.Title
                    className="block-ellipsis-title"
                    style={{ marginBottom: "10px" }}
                  >
                    {cloth.name}
                  </Card.Title>
                  <Card.Text className="block-ellipsis">
                    {cloth.description}
                  </Card.Text>
                  <Card.Title className="old-price">
                    {cloth.oldPrice}
                  </Card.Title>
                  <Card.Title className="price">
                    {cloth.price + " " + cloth.currency}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Link>
            <Button
              onClick={() => handleRemoveFav(cloth?.idCloth)}
              className="btn-remove-from-fav"
            >
              Remove From Favorite
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardInFav;
