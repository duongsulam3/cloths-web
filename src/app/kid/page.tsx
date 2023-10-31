"use client";
import CardItem from "@/components/cards";
import Filter from "@/components/filter";
import { db } from "@/config/firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const KidClothPage = () => {
  const [kidClothList, setKidClothList] = useState([] as any);

  useEffect(() => {
    const getKidClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionKidQuery = query(
          clothCollectionRef,
          where("category", "==", "kid")
        );
        const data = await getDocs(sectionKidQuery);
        const filterData = data.docs.map((doc) => ({ ...doc.data() }));
        setKidClothList(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getKidClothList();
  }, []);

  return (
    <>
      <Image
        style={{ marginTop: "3vh", height: "225px", objectFit: "cover" }}
        className="d-block w-100"
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2Fresd3fc7734db981f36bd8086c1b1094050fr.jpg?alt=media&token=0209bf37-48bd-45a8-81b0-97042a2372da&_gl=1*1g7m8nx*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5NjQ5MTkxNy4xMTUuMS4xNjk2NDk0MjY5LjQ4LjAuMA.."
      />
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>Thời Trang Nhí</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col xs={2}>
            <Filter />
          </Col>
          <Col xs={10}>
            <CardItem cloths={kidClothList} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default KidClothPage;
