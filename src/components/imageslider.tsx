import { Cloth } from "@/types/backend";
import { Key, SetStateAction, useState } from "react";

import { Carousel, Col, Image, Row } from "react-bootstrap";

interface IPros {
  cloth: Cloth;
}

const ImageSlider = (props: IPros) => {
  let { cloth } = props;

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex: SetStateAction<number>) => {
    setIndex(selectedIndex);
  };

  return (
    <Row>
      <Col xs="2">
        {cloth?.img.map((imageSrc: string, i: Key) => {
          return <Image alt="" key={i} src={imageSrc} thumbnail />;
        })}
      </Col>
      <Col xs="10">
        <Carousel activeIndex={index} onSelect={setIndex} variant="dark">
          {cloth?.img.map((imageSrc: string, i: Key) => {
            return (
              <Carousel.Item key={i}>
                <Image alt="" src={imageSrc} fluid />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ImageSlider;
