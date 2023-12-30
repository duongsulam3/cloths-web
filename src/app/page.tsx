"use client";

import CarouselBanner from "@/components/carousel";
import "@/app/page.module.scss";
import { useState, useEffect } from "react";
import { getDocs, collection, where, query, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import CardItem from "@/components/card/cards";
import ListCardItem from "@/components/card/card";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import BannerPlaceHolder from "@/components/place_holder/banner-placeholder";

export default function Home() {
  // States
  const [loading, setLoading] = useState(true);
  const [bannerList, setBannerList] = useState([] as any);
  const [clothList, setClothList] = useState([] as any);
  const [saleList, setSaleList] = useState([] as any);
  const [mostBuyList, setMostBuyList] = useState([] as any);

  useEffect(() => {
    window.scrollTo(0, 0);

    //Fetching Banner List
    const getBannerList = async () => {
      try {
        const bannerCollectionRef = collection(db, "banner");
        const data = await getDocs(bannerCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setBannerList(filterData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    // Fetching Cloth List
    const getClothList = async () => {
      const clothCollectionRef = collection(db, "clothing");
      try {
        const data = await getDocs(clothCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setClothList(filterData);

        const saleQuery = query(clothCollectionRef, where("sale", "!=", "0%"));
        const saleData = await getDocs(saleQuery);
        const filterSaleData = saleData.docs.map((doc) => ({
          ...doc.data(),
        }));
        setSaleList(filterSaleData);

        const mostBuyQuery = query(
          clothCollectionRef,
          where("sold", ">", 100),
          orderBy("sold", "desc")
        );
        const mostBuyData = await getDocs(mostBuyQuery);
        const filterMostBuyData = mostBuyData.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMostBuyList(filterMostBuyData);
      } catch (error) {
        console.error(error);
      }
    };

    getBannerList();
    getClothList();
  }, []);

  return (
    <>
      {loading ? (
        <BannerPlaceHolder />
      ) : (
        <CarouselBanner banners={bannerList} />
      )}

      {/* Sale */}
      <Container fluid>
        <div className="caption-main-page-container">
          <div className="caption-container">
            <h2>Sale</h2>
          </div>
        </div>
        <Row className="g-2">
          <Col>
            <ListCardItem cloths={saleList} />
          </Col>
        </Row>
      </Container>

      {/* Most Buy */}
      <Container fluid>
        <div className="caption-main-page-container">
          <div className="caption-container">
            <h2>Top Buy</h2>
          </div>
        </div>
        <Row className="g-2">
          <Col>
            <ListCardItem cloths={mostBuyList} />
          </Col>
        </Row>
      </Container>

      {/* All Products */}
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h2 style={{ paddingLeft: "10px" }}>Products</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col>
            <CardItem cloths={clothList} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
