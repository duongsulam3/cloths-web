"use client";
import CardItem from "@/components/cards";
import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

const BabyClothPage = () => {
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
      } catch (error) {
        console.error(error);
      }
    };
    getBabyClothList();
  }, []);

  return (
    <>
      <Image
        style={{ marginTop: "3vh" }}
        className="d-block w-100"
        alt=""
        src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.rainbowfertility.com.au%2Fwp-content%2Fuploads%2F2021%2F03%2FRF-Web-banner-Brisbane-Opening_desktop.jpg&tbnid=bEQ08bmBPyDfFM&vet=12ahUKEwi2nsTlvt6BAxVZcfUHHXREAewQMygmegUIARCdAQ..i&imgrefurl=https%3A%2F%2Fwww.rainbowfertility.com.au%2Fhome%2Frf-web-banner-brisbane-opening_desktop%2F&docid=S9qDkd7x9rnhAM&w=1920&h=694&q=baby%20banner&ved=2ahUKEwi2nsTlvt6BAxVZcfUHHXREAewQMygmegUIARCdAQ"
      />
      <div style={{ marginTop: "1vh" }} className="text-center ">
        <h2>Thời Trang Bé</h2>
      </div>
      <CardItem cloths={babyClothList} />
    </>
  );
};

export default BabyClothPage;
