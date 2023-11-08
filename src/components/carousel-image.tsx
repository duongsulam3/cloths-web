import { Image } from "react-bootstrap";

const CarouselImage = (props: any) => {
  return (
    <Image alt="carousel-image" className="img-carousel" src={props.src} />
  );
};

export default CarouselImage;
