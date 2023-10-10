"use client";

import CarouselBanner from "@/components/carousel";
import "@/app/page.module.scss";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import CardItem from "@/components/cards";

export default function Home() {
  const [bannerList, setBannerList] = useState([] as any);
  const [clothList, setClothList] = useState([] as any);
  useEffect(() => {
    const getBannerList = async () => {
      try {
        const bannerCollectionRef = collection(db, "banner");
        const data = await getDocs(bannerCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setBannerList(filterData);
      } catch (e) {
        console.error(e);
      }
    };
    const getClothList = async () => {
      try {
        const clothCollectionRef = collection(db, "clothing");

        const data = await getDocs(clothCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        // console.log(filterData);
        setClothList(filterData);
      } catch (error) {
        console.error(error);
      }
    };
    getBannerList();
    getClothList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CarouselBanner banners={bannerList} />
      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <h2>Sản phẩm</h2>
      </div>
      <CardItem cloths={clothList} />
    </>
  );
}
