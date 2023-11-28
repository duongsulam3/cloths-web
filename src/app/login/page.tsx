"use client";
import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { Button, Modal, Image, Form, Col, Row, Alert } from "react-bootstrap";

import { useRouter } from "next/navigation";
import FormInput from "@/components/form-input";

const LoginPage = () => {
  const route = useRouter();
  const { user, googleSignIn, logOut, emailSignIn, emailSignUp } = UserAuth();
  // console.log(user);

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
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      // console.log("logout");
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
    if (createPassword === confirmPassword) {
      try {
        {
          await emailSignUp(createEmail, createPassword);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Password doesn't match");
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
            <FormInput title="Email" type="email" sharedValue={setEmail} />
            <FormInput
              title="Password"
              type="password"
              sharedValue={setPassword}
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
                <FormInput
                  type="email"
                  title="Email"
                  sharedValue={setCreateEmail}
                />

                <FormInput
                  type="password"
                  title="Password"
                  sharedValue={setCreatePassword}
                />

                <FormInput
                  type="password"
                  title="Confirm Password"
                  sharedValue={setConfirmPassword}
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
