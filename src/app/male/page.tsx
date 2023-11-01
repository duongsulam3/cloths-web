"use client";
import { Col, Container, Image, Row } from "react-bootstrap";
import CardItem from "@/components/cards";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import Filter from "@/components/filter";
const MaleClothPage = () => {
  const [menClothList, setMenClothList] = useState([] as any);

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
        // console.log(filterData);
        setMenClothList(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getMenClothList();
  }, []);

  return (
    <>
      <Image
        style={{ marginTop: "2vh", minHeight: "125px" }}
        className="d-block w-100"
        alt=""
        src="https://firebasestorage.googleapis.com/v0/b/shopping-app-flutter-8f35d.appspot.com/o/images%2Fbanners%2Fthoi-trang-nam-thuong-hieu-routine-dep-cao-cap-chinh-hang.jpg?alt=media&token=0f862b23-0a67-4dbb-81b7-a3f6dab2bcb5&_gl=1*1di0ihs*_ga*MTA0MjcyMTA4MS4xNjc3NzU4MTMx*_ga_CW55HF8NVT*MTY5NjI2MTM3NS4xMDcuMS4xNjk2MjYxOTM2LjM5LjAuMA.."
      />
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>Thời Trang Nam</h2>
      </div>
      <Container fluid>
        <Row className="g-2">
          <Col>
            <CardItem cloths={menClothList} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MaleClothPage;
