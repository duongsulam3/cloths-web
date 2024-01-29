"use client";
import DescriptionCloth from "@/components/detail_page_components/detail-cloth";
import ImageSlider from "@/components/detail_page_components/imageslider";
import { db } from "@/config/firebase";
import {
  doc,
  onSnapshot,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import CardItem from "@/components/card/cards";

const DetailCloth = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [singleCloth, setSingleCloth] = useState() as any;
  const [saleList, setSaleList] = useState([] as any);
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

    const getSaleList = async () => {
      const clothCollectionRef = collection(db, "clothing");
      try {
        const saleQuery = query(clothCollectionRef, where("sale", "!=", "0%"));
        const saleData = await getDocs(saleQuery);
        const filterSaleData = saleData.docs.map((doc) => ({
          ...doc.data(),
        }));
        setSaleList(filterSaleData);
      } catch (error) {
        console.error(error);
      }
    };
    getClothById();
    getSaleList();
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
      <div className="caption-detail-page-container">
        <h2>Overview</h2>
        <p>Product ID: {params.id}</p>
        <p>
          Please note that this product may have different product ID, even if
          it is the same item.
        </p>
        <p>- The images shown may include colors that are not available.</p>
        <b>Fabric details</b>
        <p>
          Body: Pocket Lining: 100% Polyester ( 100% Uses Recycled Polyester
          Fiber )
        </p>
      </div>
      <div className="caption-detail-page-container">
        <h2>Sale</h2>
      </div>
      <Row className="g-2">
        <Col>
          <CardItem cloths={saleList} />
        </Col>
      </Row>
    </Container>
  );
};

export default DetailCloth;
