import { toast } from "react-toastify";
import { db } from "@/config/firebase";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { User } from "@/types/backend";
import { UserAuth } from "@/context/authContext";

interface IProps {
  showModalUpdatePassword: boolean;
  setShowModalUpdatePassword: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
}

const UpdatePasswordModal = (props: IProps) => {
  const { showModalUpdatePassword, setShowModalUpdatePassword, user, setUser } =
    props;

  const [id, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { resetPassword } = UserAuth();

  useEffect(() => {
    if (user && user.userID) {
      setID(user.userID);
      setPassword(user.password);
    }
  }, [user]);

  const handleCloseModal = () => {
    setID("");
    setPassword("");
    setUser(null);
    setShowModalUpdatePassword(false);
  };

  const handleSubmit = async () => {
    if (oldPass == password) {
      if (newPass == confirmPassword) {
        try {
          await resetPassword(newPass);
        } catch (error) {
          console.error(error);
        }
      } else {
        toast.error(
          "Password and confirm password aren't correct, Please try again!"
        );
        return;
      }
    } else {
      toast.error("Old password not correct, Please try again!");
      return;
    }
  };

  return (
    <>
      <Modal
        show={showModalUpdatePassword}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "auto" }}>
          <Form.Label>Old password</Form.Label>
          <Form.Control
            type="password"
            id={`update-password-user-${id}`}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            id={`update-password-user-${id}`}
            onChange={(e) => setNewPass(e.target.value)}
          />
          <Form.Label>Confirm new password</Form.Label>
          <Form.Control
            type="password"
            id={`update-password-user-${id}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Hủy
          </Button>
          <Button onClick={() => handleSubmit()} variant="warning">
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdatePasswordModal;
