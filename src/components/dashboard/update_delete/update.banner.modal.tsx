import { db } from "@/config/firebase";
import { Banner } from "@/types/backend";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

interface IProps {
  showModalUpdateBanner: boolean;
  setShowModalUpdateBanner: (value: boolean) => void;
  banner: Banner | null;
  setBanner: (value: Banner | null) => void;
}

const UpdateBannerModal = (props: IProps) => {
  const { showModalUpdateBanner, setShowModalUpdateBanner, banner, setBanner } =
    props;

  const [id, setID] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    if (banner && banner.idBanner) {
      setID(banner.idBanner);
      setCaption(banner.caption);
      setImageURL(banner.img);
    }
  }, [banner]);

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "banner", id);
      const updateBannerData = {
        caption: caption,
        img: imageURL,
      };
      await updateDoc(docRef, updateBannerData).then(() => {
        toast.success("Update Banner Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setCaption("");
    setImageURL("");
    setBanner(null);
    setShowModalUpdateBanner(false);
  };
  return (
    <>
      <Modal
        show={showModalUpdateBanner}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Caption</Form.Label>
          <Form.Control
            type="text"
            id={`update-caption-banner-${id}`}
            defaultValue={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            id={`update-url-img-banner-${id}`}
            defaultValue={imageURL}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button onClick={() => handleSubmit()} variant="warning">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateBannerModal;
