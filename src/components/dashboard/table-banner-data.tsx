import { db } from "@/config/firebase";
import { Banner } from "@/types/backend";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

interface IProps {
  banners: Banner[];
}

const TableBannerData = (props: IProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { banners } = props;

  const handleDeleteBanner = async (idBanner: string) => {
    try {
      const docRef = doc(db, "banner", idBanner);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = () => {};

  return (
    <div className="table-container">
      <Table responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Banner ID</th>
            <th>Banner caption</th>
            <th>Banner Image Source</th>
          </tr>
        </thead>
        <tbody>
          {banners?.map((banner, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{banner.idBanner}</td>
                <td>{banner.caption}</td>
                <td>{banner.img}</td>
                <td>
                  <Button onClick={handleUpdate} variant="warning">
                    Update
                  </Button>
                  <Button onClick={handleShow} variant="danger">
                    Delete
                  </Button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete this banner</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        onClick={() => handleDeleteBanner(banner.idBanner)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableBannerData;
