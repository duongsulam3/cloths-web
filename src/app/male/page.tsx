"use client";
import { Col, Container, Image, Row } from "react-bootstrap";
import CardItem from "@/components/cards";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import Filter from "@/components/filter";
import BannerImagePages from "@/components/banner-image-pages";
import BannerPlaceHolderCate from "@/components/banner-placeholder-cate";
import CardPlaceHolder from "@/components/placeholder";
const MaleClothPage = () => {
  const [menClothList, setMenClothList] = useState([] as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMenClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionMenQuery = query(
          clothCollectionRef,
          where("category", "==", "men")
        );
        const data = await getDocs(sectionMenQuery);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setMenClothList(filterData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getMenClothList();
  }, []);

  return (
    <>
      {loading ? (
        <BannerPlaceHolderCate />
      ) : (
        <BannerImagePages src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2Fthoi-trang-nam-thuong-hieu-routine-dep-cao-cap-chinh-hang.jpg?alt=media&token=0f862b23-0a67-4dbb-81b7-a3f6dab2bcb5&_gl=1*11a9svt*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5ODg0NjkxMy4xNzQuMS4xNjk4ODQ3NzIyLjU2LjAuMA.." />
      )}
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>Male Fashion</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col>
            {loading ? <CardPlaceHolder /> : <CardItem cloths={menClothList} />}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MaleClothPage;
