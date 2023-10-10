"use client";
import { Cloth } from "@/types/backend";
import Card from "react-bootstrap/Card";
import "@/styles/app.scss";
import { Row, Col, Container } from "react-bootstrap";

import Filter from "./filter";
import Link from "next/link";

interface IPros {
  cloths: Cloth[];
}

const CardItem = (props: IPros) => {
  let { cloths } = props;
  return (
    <Container fluid>
      <Row className="g-2">
        <Col xs={2}>
          <Filter />
        </Col>
        <Col xs={10}>
          <Row xs={1} sm={2} md={4} className="g-3">
            {cloths.map((cloth, index) => {
              return (
                <Col key={index}>
                  <Link
                    style={{ color: "transparent" }}
                    href={`/cloths/${cloth.idCloth}`}
                  >
                    <Card
                      style={{
                        paddingLeft: "0",
                        paddingRight: "0",
                      }}
                    >
                      <Card.Img variant="top" src={cloth.img[0]} />
                      <Card.Body className="card-body d-flex flex-column">
                        <Card.Title
                          style={{ textAlign: "start" }}
                          className="block-ellipsis-title"
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
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CardItem;
