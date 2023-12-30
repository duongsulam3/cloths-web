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

interface IProps {
  showModalUpdateProfile: boolean;
  setShowModalUpdateProfile: (value: boolean) => void;
  user: User | null;
  setUser: (value: User | null) => void;
}

const UpdateProfileModal = (props: IProps) => {
  const { showModalUpdateProfile, setShowModalUpdateProfile, user, setUser } =
    props;

  const [id, setID] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<number>();

  useEffect(() => {
    if (user && user.userID) {
      setID(user.userID);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAddress(user.address);
      setCity(user.city);
      setPhone(user.phoneNumber);
    }
  }, [user]);

  const handleCloseModal = () => {
    setID("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setCity("");
    setPhone();
    setUser(null);
    setShowModalUpdateProfile(false);
  };

  const handleSubmit = async () => {
    try {
      const userDataRef = doc(db, "users", id);
      const updateData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        city: city,
        phoneNumber: phone,
      };
      await updateDoc(userDataRef, updateData).then(() => {
        toast.success("Update Banner Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={showModalUpdateProfile}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "50dvh", overflowY: "auto" }}>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            id={`update-cloth-name-${id}`}
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            id={`update-cloth-name-${id}`}
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            id={`update-caption-banner-${id}`}
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            id={`update-caption-banner-${id}`}
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            id={`update-caption-banner-${id}`}
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            id={`update-caption-banner-${id}`}
            defaultValue={phone}
            onChange={(e) => setPhone(e.target.value)}
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

export default UpdateProfileModal;
