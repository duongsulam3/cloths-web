"use client";
import CardItem from "@/components/cards";
import Filter from "@/components/filter";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const FemaleClothPage = () => {
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
      } catch (error) {
        console.error(error);
      }
    };
    getFemaleClothList();
  }, []);

  return (
    <>
      <Image
        style={{ marginTop: "3vh" }}
        className="d-block w-100"
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2Fthoi-trang-nu-thuong-hieu-routine-dep-cao-cap-chinh-hang.jpg?alt=media&token=6d872b3c-8d91-4d85-8841-64bd99e44ab2&_gl=1*h3003t*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5NjQ5MTkxNy4xMTUuMS4xNjk2NDkzMjc1LjU5LjAuMA.."
      />
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>Thời Trang Nữ</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col>
            <CardItem cloths={femaleClothList} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FemaleClothPage;
