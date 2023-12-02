"use client";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import "@/styles/app.scss";
import { Banner } from "@/types/backend";
import { Container } from "react-bootstrap";
import CarouselImage from "./carousel-image";
import PlaceHolder from "./place_holder/placeholder";

interface IProps {
  banners: Banner[];
}

const CarouselBanner = (props: IProps) => {
  let { banners } = props;
  // console.log(banners);

  return (
    <Carousel fade variant="dark">
      {banners?.map((banner, i) => {
        return (
          <Carousel.Item key={i}>
            <CarouselImage src={banner.img} caption={banner.caption} />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselBanner;
