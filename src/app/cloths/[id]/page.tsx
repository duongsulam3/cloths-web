"use client";
import DescriptionCloth from "@/components/detail-cloth";
import ImageSlider from "@/components/imageslider";
import { db } from "@/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";

const DetailCloth = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [singleCloth, setSingleCloth] = useState() as any;
  useEffect(() => {
    window.scrollTo(0, 0);
    const getClothById = () => {
      try {
        const docRef = doc(db, "clothing", params.id);
        onSnapshot(docRef, (doc) => {
          let data = doc?.data();
          setSingleCloth(data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getClothById();
  }, [params.id]);
  return (
    <Container className="container-cloth-id-page">
      <Row>
        <Col>
          {loading ? (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <ImageSlider cloth={singleCloth} />
          )}
        </Col>
        <Col>
          <DescriptionCloth
            cloth={singleCloth}
            path={`clothing/${params.id}/sizes`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DetailCloth;
