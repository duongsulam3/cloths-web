import { Image } from "react-bootstrap";

const BannerImagePages = (props: any) => {
  return (
    <Image className="img-banner-cate-pages" alt="banner-top" src={props.src} />
  );
};

export default BannerImagePages;
