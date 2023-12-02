"use client";
import BannerImagePages from "@/components/banner-image-pages";
import BannerPlaceHolderCate from "@/components/place_holder/banner-placeholder-cate";
import CardItem from "@/components/card/cards";
import Filter from "@/components/search/filter";
import CardPlaceHolder from "@/components/place_holder/placeholder";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const BabyClothPage = () => {
  const [loading, setLoading] = useState(true);
  const [babyClothList, setBabyClothList] = useState([] as any);

  useEffect(() => {
    const getBabyClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionBabyQuery = query(
          clothCollectionRef,
          where("category", "==", "baby")
        );
        const data = await getDocs(sectionBabyQuery);
        const filterData = data.docs.map((doc) => ({ ...doc.data() }));
        setBabyClothList(filterData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getBabyClothList();
  }, []);

  return (
    <>
      {loading ? (
        <BannerPlaceHolderCate />
      ) : (
        <BannerImagePages src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2FBS1103-Mint-Green-Baby-Clothes-Shower-Banner__18495.jpg?alt=media&token=3c835b3e-b322-4626-bcde-564786fa10cf&_gl=1*usdidw*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5ODg0NjkxMy4xNzQuMS4xNjk4ODQ4NDc3LjIwLjAuMA.." />
      )}
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>For Baby</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col>
            {loading ? (
              <CardPlaceHolder />
            ) : (
              <CardItem cloths={babyClothList} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BabyClothPage;
