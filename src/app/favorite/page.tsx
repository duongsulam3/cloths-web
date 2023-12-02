"use client";
import CardInFav from "@/components/card/card-in-fav";
import CardItem from "@/components/card/cards";
import CardPlaceHolder from "@/components/place_holder/placeholder";
import { db } from "@/config/firebase";
import { useFav } from "@/context/favContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const FavoritePage = () => {
  const { loading, fav } = useFav();

  const [favClothList, setFavClothList] = useState([] as any);

  useEffect(() => {
    const fetchFavClothData = async () => {
      const clothDataPromises = [];

      // Loop through fav items and create fetch promises
      for (const favItem of fav) {
        const clothDocRef = doc(db, "clothing", favItem.itemID);
        clothDataPromises.push(getDoc(clothDocRef));
      }

      // Wait for all promises to resolve and collect data
      const clothDataList = await Promise.all(clothDataPromises);

      const clothList = clothDataList.map((clothDoc) => {
        return clothDoc.data();
      });

      setFavClothList(clothList);
    };
    fetchFavClothData();
  }, [fav]);

  return (
    <div className="div-90vh-10pad">
      <h1>Favorite Item List</h1>
      <Container fluid>
        <Row className="g-2">
          <Col>
            {loading ? (
              <CardPlaceHolder />
            ) : (
              <CardInFav cloths={favClothList} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FavoritePage;
