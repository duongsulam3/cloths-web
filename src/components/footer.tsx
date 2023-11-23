import Link from "next/link";
import { Image } from "react-bootstrap";
const Footer = () => {
  return (
    <div className="footer">
      <h2>mycloths.vercel.app</h2>
      <div className="footer-link-container">
        <Link className="footer-link" href={"/"}>
          Home
        </Link>
        <Link className="footer-link" href={"/"}>
          About
        </Link>
        <Link className="footer-link" href={"/"}>
          Contact
        </Link>
      </div>
      <div className="footer-logo-container">
        <Image className="footer-logo" alt="github" src="/github_logo.png" />
        <Image
          className="footer-logo"
          alt="facebook"
          src="/facebook_logo.png"
        />
        <Image className="footer-logo" alt="vanhien" src="/vanhien_logo.png" />
      </div>
    </div>
  );
};

export default Footer;
