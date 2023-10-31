"use client";

import CardItem from "@/components/cards";
import Filter from "@/components/filter";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const SearchPage = () => {
  const [searchClothList, setSearchClothList] = useState([] as any);
  const searchParams = useSearchParams();

  const queryCloth = searchParams.get("query");
  //console.log(queryCloth);
  useEffect(() => {
    const getSearchClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");
        const sectionClothQuery = query(
          clothCollectionRef,
          where("keySearch", "array-contains", queryCloth!)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryCloth]);

  return (
    <>
      <h5 style={{ position: "absolute", right: "10px" }}>
        Result for: {queryCloth}
      </h5>
      <Container fluid style={{ paddingTop: "30px" }}>
        <Row className="g-2">
          <Col xs={2}>
            <Filter />
          </Col>
          <Col xs={10}>
            <CardItem cloths={searchClothList} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchPage;
