"use client";

import CarouselBanner from "@/components/carousel";
import "@/app/page.module.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import CardItem from "@/components/cards";
import { Col, Container, Row } from "react-bootstrap";
import PlaceHolder from "@/components/placeholder";
import BannerPlaceHolder from "@/components/banner-placeholder";
import { UserAuth } from "@/context/authContext";

export default function Home() {
  //const { user } = UserAuth();
  //console.log(user);
  const [loading, setLoading] = useState(true);
  const [bannerList, setBannerList] = useState([] as any);
  const [clothList, setClothList] = useState([] as any);
  useEffect(() => {
    window.scrollTo(0, 0);
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
    const getClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");

        const data = await getDocs(clothCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setClothList(filterData);
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
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h2>Products</h2>
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
