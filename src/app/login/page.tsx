"use client";
import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Button, Modal, Image, Form, Col, Row } from "react-bootstrap";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const route = useRouter();
  const { user, googleSignIn, logOut } = UserAuth();
  //console.log(user);

  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalHide = () => {
    setShow(false);
  };

  const handleCreateAccount = () => {
    route.push("/");
  };

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuth();
  }, [user]);
  return (
    <div className="login-page-div">
      <Row>
        <Col>
          <h1>Login</h1>
          <Form>
            <Form.Text>
              <h3>Email</h3>
            </Form.Text>
            <Form.Control
              autoComplete="username"
              className="input-email"
              type="email"
              id="inputEmail5"
            />
            <Form.Text>
              <h3>Password</h3>
            </Form.Text>
            <Form.Control
              autoComplete="current-password"
              className="input-password"
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Form>

          <Button className="login-button">
            <h2>Login</h2>
          </Button>

          <Button
            className="login-button"
            variant="dark"
            onClick={() => setShow(true)}
          >
            Login With Different Way
          </Button>

          <Modal
            show={show}
            onHide={handleModalHide}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Login With Social Media
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {loading ? null : user ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline-dark"
                  className="buttons-google-login"
                >
                  {`Hello ${user.displayName}`}
                </Button>
              ) : (
                <Button
                  onClick={handleSignIn}
                  variant="outline-dark"
                  className="buttons-google-login"
                >
                  <Image thumbnail alt="google-logo" src="/google_logo.png" />
                </Button>
              )}
            </Modal.Body>
          </Modal>
        </Col>
        <Col>
          <div className="div-with-bottom-border-black">
            <h1>Create An Account</h1>
            <Button
              onClick={handleCreateAccount}
              className="login-button"
              variant="dark"
            >
              Click here
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
