import { db } from "@/config/firebase";
import { Banner } from "@/types/backend";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface IProps {
  showModalDelBanner: boolean;
  setShowModalDelBanner: (value: boolean) => void;
  banner: Banner | null;
  setBanner: (value: Banner | null) => void;
}

const DelBannerModal = (props: IProps) => {
  const { showModalDelBanner, setShowModalDelBanner, banner, setBanner } =
    props;

  const [id, setID] = useState<string>("");

  useEffect(() => {
    if (banner && banner.idBanner) {
      setID(banner.idBanner);
    }
  }, [banner]);

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "banner", id);
      await deleteDoc(docRef).then(() => {
        toast.warning("Banner Deleted Successful");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setBanner(null);
    setShowModalDelBanner(false);
  };
  return (
    <>
      <Modal
        show={showModalDelBanner}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete this banner</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button onClick={() => handleSubmit()} variant="danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DelBannerModal;
