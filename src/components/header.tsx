"use client";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "material-icons/iconfont/material-icons.css";

import "@/styles/app.scss";
import SearchBar from "./search-bar";
import Link from "next/link";

const Header = () => {
  return (
    <Navbar
      variant="light"
      style={{
        height: "10vh",
      }}
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">ClothS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/male">Male</Nav.Link>
            <Nav.Link href="/female">Female</Nav.Link>
            <Nav.Link href="/kid">Kid</Nav.Link>
            <Nav.Link href="/baby">Baby</Nav.Link>
            {/* <NavDropdown title="Phụ kiện" id="basic-nav-dropdown">
              <NavDropdown.Item href="/accessories/shoes">
                Giày
              </NavDropdown.Item>
              <NavDropdown.Item href="/accessories/wallet">
                Ví da
              </NavDropdown.Item>
              <NavDropdown.Item href="/accessories/belt">
                Thắt lưng
              </NavDropdown.Item>
              <NavDropdown.Item href="/accessories/tie">
                Cà vạt
              </NavDropdown.Item>
              <NavDropdown.Item href="/accessories/sock">
                Tất / Vớ
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Khác</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <div className="div-flex-center">
            <SearchBar />
            {/* <Nav.Link href={"/"}>
              <span style={{ marginLeft: "10px" }} className="material-icons">
                favorite_border
              </span>
            </Nav.Link> */}
            <Nav.Item className="nav-items">
              <Button variant="outline-dark" className="buttons-header">
                <Link href={"/cart"} className="link">
                  <span className="material-icons">shopping_cart</span>
                  {`Cart (${0})`}
                </Link>
              </Button>
            </Nav.Item>
            <Nav.Item className="nav-items">
              <Button variant="outline-dark" className="buttons-header-login">
                <Link href={"/login"} className="link">
                  <span className="material-icons">person</span>
                  {"Login"}
                </Link>
              </Button>
            </Nav.Item>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
