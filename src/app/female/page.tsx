"use client";
import BannerImagePages from "@/components/banner-image-pages";
import BannerPlaceHolderCate from "@/components/place_holder/banner-placeholder-cate";
import CardItem from "@/components/card/cards";
import Filter from "@/components/search/filter";
import CardPlaceHolder from "@/components/place_holder/placeholder";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const FemaleClothPage = () => {
  const [loading, setLoading] = useState(true);
  const [femaleClothList, setFemaleClothList] = useState([] as any);

  useEffect(() => {
    const getFemaleClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionFemaleQuery = query(
          clothCollectionRef,
          where("category", "==", "women")
        );
        const data = await getDocs(sectionFemaleQuery);
        const filterData = data.docs.map((doc) => ({ ...doc.data() }));
        setFemaleClothList(filterData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getFemaleClothList();
  }, []);

  return (
    <>
      {loading ? (
        <BannerPlaceHolderCate />
      ) : (
        <BannerImagePages src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2Fthoi-trang-nu-thuong-hieu-routine-dep-cao-cap-chinh-hang.jpg?alt=media&token=6d872b3c-8d91-4d85-8841-64bd99e44ab2&_gl=1*adf1rn*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5ODg0NjkxMy4xNzQuMS4xNjk4ODQ4NDM3LjYwLjAuMA.." />
      )}

      <Container fluid>
        <div className="caption-cate-page-container">
          <h2>Female Fashion</h2>
        </div>
        <Row className="g-2">
          <Col>
            {loading ? (
              <CardPlaceHolder />
            ) : (
              <CardItem cloths={femaleClothList} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FemaleClothPage;
