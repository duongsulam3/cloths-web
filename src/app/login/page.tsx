"use client";
import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Button, Modal, Image, Form, Col, Row, Alert } from "react-bootstrap";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const route = useRouter();
  const { user, googleSignIn, logOut, emailSignIn, emailSignUp } = UserAuth();
  console.log(user);

  //Loading
  const [loading, setLoading] = useState(true);

  //Modal's States
  const [showLoginWithOtherWay, setShowLoginWithOtherWay] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  //Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Sign Up
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSignIn = () => {
    googleSignIn();
  };

  const handleSignInEmailAndPassword = async () => {
    try {
      await emailSignIn(email, password);
    } catch (error) {
      console.error(error);
    }
    route.push("/");
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
    if (showLoginWithOtherWay == true) {
      setShowLoginWithOtherWay(false);
    }
    if (showModalCreate == true) {
      setShowModalCreate(false);
    }
  };

  const handleShowModalCreateAccount = () => {
    setShowModalCreate(true);
  };
  const handleCreateAccount = async () => {
    try {
      if (createPassword === confirmPassword) {
        await emailSignUp(createEmail, createPassword);
      } else {
        console.log("Password doesn't match");
      }
    } catch (error) {
      console.error(error);
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form>

          <Button
            onClick={handleSignInEmailAndPassword}
            className="login-button"
          >
            <h2>Login</h2>
          </Button>

          <Button
            className="login-button"
            variant="dark"
            onClick={() => setShowLoginWithOtherWay(true)}
          >
            Login With Different Way
          </Button>

          {/* Login With Another Way Modal */}
          <Modal
            show={showLoginWithOtherWay}
            onHide={handleModalHide}
            keyboard={false}
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
                  onClick={handleGoogleSignIn}
                  variant="outline-dark"
                  className="buttons-google-login"
                >
                  <Image thumbnail alt="google-logo" src="/google_logo.png" />
                </Button>
              )}
            </Modal.Body>
          </Modal>

          {/* Create Account Modal */}
          <Modal
            show={showModalCreate}
            onHide={handleModalHide}
            backdrop="static"
            keyboard={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Label htmlFor="inputEmail">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="inputEmail"
                  value={createEmail}
                  onChange={(e) => setCreateEmail(e.target.value)}
                />

                <Form.Label htmlFor="inputPassword">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword"
                  autoComplete="on"
                  aria-describedby="passwordHelpBlock"
                  value={createPassword}
                  onChange={(e) => setCreatePassword(e.target.value)}
                />

                <Form.Label htmlFor="inputConfirmPassword">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  id="inputConfirmPassword"
                  autoComplete="on"
                  aria-describedby="passwordHelpBlock"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleModalHide}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCreateAccount}>
                Create Account
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col>
          <div className="div-with-bottom-border-black">
            <h1>Create An Account</h1>
            <Button
              onClick={handleShowModalCreateAccount}
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
