"use client";
import { Cloth } from "@/types/backend";
import Card from "react-bootstrap/Card";
import "@/styles/app.scss";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { NumericFormat } from "react-number-format";

interface IPros {
  cloths: Cloth[];
}

const CardItem = (props: IPros) => {
  let { cloths } = props;
  return (
    <Row xs={1} sm={2} md={4} className="g-3">
      {cloths?.map((cloth, index) => {
        return (
          <Col key={index}>
            <Link className="card-link" href={`/cloths/${cloth.idCloth}`}>
              <Card className="card-padding-l-r-0">
                <Card.Img variant="top" src={cloth.img[0]} />
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
                  {cloth.sale == "0%" ? (
                    <>
                      <Card.Title
                        style={{ fontSize: "25px", marginTop: "5dvh" }}
                      >
                        <NumericFormat
                          value={cloth.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"VND"}
                        />
                      </Card.Title>
                    </>
                  ) : (
                    <>
                      <Card.Title className="old-price">
                        <NumericFormat
                          value={cloth.oldPrice.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </Card.Title>
                      <Card.Title className="price">
                        <NumericFormat
                          value={cloth.price.toFixed(2)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"VND"}
                        />
                      </Card.Title>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};

export default CardItem;
