"use client";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";

import "@/styles/app.scss";
import { Banner } from "@/types/backend";
import { Container } from "react-bootstrap";

interface IProps {
  banners: Banner[];
}

const CarouselBanner = (props: IProps) => {
  let { banners } = props;
  // console.log(banners);
  return (
    <Carousel fade>
      {banners?.map((banner) => {
        return (
          <Carousel.Item key={banner.id}>
            <Image
              style={{ height: "90vh" }}
              className="d-block w-100"
              alt=""
              src={banner.img}
            />
            {/* <Container>
              <Carousel.Caption className="carousel-caption">
                <h1>{banner.caption}</h1>
              </Carousel.Caption>
            </Container> */}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselBanner;
