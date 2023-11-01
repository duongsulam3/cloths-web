import { Image } from "react-bootstrap";

const BannerImagePages = (props: any) => {
  return (
    <Image
      style={{ marginTop: "3vh", minHeight: "125px", maxHeight: "400px" }}
      className="d-block w-100"
      alt="banner-top"
      src={props.src}
    />
  );
};

export default BannerImagePages;
