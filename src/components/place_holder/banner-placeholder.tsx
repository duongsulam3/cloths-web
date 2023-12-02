import "@/styles/app.scss";
import { Spinner } from "react-bootstrap";

const BannerPlaceHolder = () => {
  return (
    <div className="banner-main-placeholder">
      <Spinner animation="grow"></Spinner>
    </div>
  );
};

export default BannerPlaceHolder;
