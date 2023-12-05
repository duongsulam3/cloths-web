import { Image } from "react-bootstrap";

const CarouselImage = (props: any) => {
  return (
    <Image fluid alt={props.caption} className="img-carousel" src={props.src} />
  );
};

export default CarouselImage;
