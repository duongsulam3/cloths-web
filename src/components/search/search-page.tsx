"use client";
import CardItem from "@/components/card/cards";
import Filter from "@/components/search/filter";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const SearchPageComponent = () => {
  const [searchClothList, setSearchClothList] = useState([] as any);
  const searchParams = useSearchParams();

  const queryCloth = searchParams.get("query");
  useEffect(() => {
    const getSearchClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionClothQuery = query(
          clothCollectionRef,
          where("keySearch", "array-contains", queryCloth)
        );
        const data = await getDocs(sectionClothQuery);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        console.log(filterData);
        setSearchClothList(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getSearchClothList();
  }, [queryCloth]);

  return (
    <div className="div-90vh-10pad">
      <Container fluid style={{ paddingTop: "30px" }}>
        <h5 style={{ textAlign: "right" }}>Result for: {queryCloth}</h5>
        <Row className="g-2">
          <Col>
            <CardItem cloths={searchClothList} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchPageComponent;
