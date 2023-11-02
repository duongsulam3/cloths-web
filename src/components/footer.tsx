import { Container } from "react-bootstrap";
const Footer = () => {
  return (
    <Container>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item">
            <a href="/" className="nav-link px-2 text-muted">
              ClothS
            </a>
          </li>
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">About</p>
          </li>
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">Product</p>
            <p className="nav-link px-2 text-muted">NextJS</p>
            <p className="nav-link px-2 text-muted">Bootstrap 5</p>
          </li>
          <li className="nav-item">
            <p className="nav-link px-2 text-muted">Contact</p>
            <p className="nav-link px-2 text-muted">Ho Chi Minh city</p>
            <p className="nav-link px-2 text-muted">duongsulam1234@gmail.com</p>
          </li>
        </ul>
        <p className="text-center text-muted">@ 2023 Company</p>
      </footer>
    </Container>
  );
};

export default Footer;
