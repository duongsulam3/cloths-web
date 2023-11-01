import { Image } from "react-bootstrap";

const CarouselImage = (props: any) => {
  return (
    <Image
      alt="carousel-image"
      style={{ height: "90vh" }}
      className="d-block w-100"
      src={props.src}
    />
  );
};

export default CarouselImage;
