"use client";
import { Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "material-icons/iconfont/material-icons.css";
import Link from "next/link";

import "@/styles/app.scss";
import SearchBar from "./search-bar";

const Header = () => {
  return (
    <Navbar
      variant="light"
      style={{ height: "10vh" }}
      sticky="top"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">ClothS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/male">Nam</Nav.Link>
            <Nav.Link href="/female">Nữ</Nav.Link>
            <Nav.Link href="/kid">Trẻ em</Nav.Link>
            <Nav.Link href="/baby">Em bé</Nav.Link>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchBar />
            <Nav.Link href={"/"}>
              <span style={{ marginLeft: "10px" }} className="material-icons">
                favorite_border
              </span>
            </Nav.Link>
            <Nav.Link href={"/"}>
              <span style={{ marginLeft: "10px" }} className="material-icons">
                shopping_cart
              </span>
            </Nav.Link>
            <Nav.Link href={"/"}>
              <span style={{ marginLeft: "10px" }} className="material-icons">
                person
              </span>
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
