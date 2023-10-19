"use client";
import DescriptionCloth from "@/components/detail-cloth";
import ImageSlider from "@/components/imageslider";
import { db } from "@/config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const DetailCloth = ({ params }: { params: { id: string } }) => {
  const [singleCloth, setSingleCloth] = useState() as any;
  useEffect(() => {
    const getClothById = () => {
      try {
        const docRef = doc(db, "clothing", params.id);
        onSnapshot(docRef, (doc) => {
          let data = doc?.data();
          setSingleCloth(data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getClothById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container style={{ marginTop: "10px" }}>
      <Row>
        <Col>
          <ImageSlider cloth={singleCloth} />
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
