"use client";
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const LoginPage = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  console.log(user);

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

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuth();
  }, [user]);
  return (
    <div className="login-page-div">
      <Button
        className="login-button"
        variant="dark"
        onClick={() => setShow(true)}
      >
        Click Here To Login
      </Button>

      <Modal
        show={show}
        onHide={handleModalHide}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? null : user ? (
            <Button
              onClick={handleSignOut}
              variant="outline-dark"
              className="buttons-header-login"
            >
              {`Hello ${user.displayName}`}
            </Button>
          ) : (
            <Button
              onClick={handleSignIn}
              variant="outline-dark"
              className="buttons-header-login"
            >
              {"Login With Google"}
            </Button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPage;
