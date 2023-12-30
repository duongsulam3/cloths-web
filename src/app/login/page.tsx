"use client";
import { UserAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Image,
  Form,
  Col,
  Row,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import FormInput from "@/components/form-input";

const LoginPage = () => {
  const { user, googleSignIn, logOut, emailSignIn, emailSignUp } = UserAuth();

  //Loading
  const [loading, setLoading] = useState(true);

  //Modal's States
  const [showLoginWithOtherWay, setShowLoginWithOtherWay] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  //Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Sign Up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleSignIn = () => {
    googleSignIn();
  };

  const handleSignInEmailAndPassword = async () => {
    if (email && password != "") {
      try {
        await emailSignIn(email, password);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Missing input, please try again!");
      return;
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
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
    if (
      firstName &&
      lastName &&
      phone &&
      address &&
      city &&
      createEmail &&
      createPassword &&
      confirmPassword != ""
    ) {
      if (createPassword === confirmPassword) {
        try {
          {
            await emailSignUp(
              createEmail,
              createPassword,
              firstName,
              lastName,
              phone,
              address,
              city
            );
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Password doesn't match");
        return;
      }
    } else {
      alert("Missing input, please try again!");
      return;
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
      <Row style={{ marginTop: "5dvh" }}>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "1px solid black",
          }}
        >
          <h1>Welcome back</h1>
          <Form style={{ width: "30vw" }}>
            <FloatingLabel
              controlId="floatingInput-email"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="name@example.com"
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingInput-password"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="***********"
              />
            </FloatingLabel>
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
                  {`Hello ${user.lastName}`}
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
            <Modal.Body style={{ height: "70dvh", overflowY: "auto" }}>
              <Form>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        type="text"
                        placeholder="Your first name"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        type="text"
                        placeholder="Your last name"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="floatingInput-phone"
                  label="Phone"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="number"
                    placeholder="Phone number"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput-address"
                  label="Address"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    placeholder="Your address"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput-city"
                  label="City"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    type="text"
                    placeholder="Your city"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput-create-email"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setCreateEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput-create-password"
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setCreatePassword(e.target.value);
                    }}
                    type="password"
                    placeholder="***********"
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="floatingInput-confirm-password"
                  label="Confirm password"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    type="password"
                    placeholder="***********"
                  />
                </FloatingLabel>
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
