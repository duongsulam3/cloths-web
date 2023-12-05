import FormInput from "@/components/form-input";
import UpdateBannerModal from "@/components/dashboard/update_delete/update.banner.modal";
import { db } from "@/config/firebase";
import { Banner } from "@/types/backend";
import { log } from "console";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DeleteBannerModal from "@/components/dashboard/update_delete/update.banner.modal";
import DelBannerModal from "./delete.banner.modal";

interface IProps {
  banners: Banner[];
}

const TableBannerData = (props: IProps) => {
  let { banners } = props;
  const [banner, setBanner] = useState<Banner | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  return (
    <div className="table-container">
      <Table responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Banner ID</th>
            <th>Banner caption</th>
            <th>Banner Image Source</th>
            <th>Action</th>
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
                  <Button
                    onClick={() => {
                      setShowModalUpdate(true), setBanner(banner);
                    }}
                    variant="warning"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      setShowModalDelete(true), setBanner(banner);
                    }}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <UpdateBannerModal
        showModalUpdateBanner={showModalUpdate}
        setShowModalUpdateBanner={setShowModalUpdate}
        banner={banner}
        setBanner={setBanner}
      />
      <DelBannerModal
        showModalDelBanner={showModalDelete}
        setShowModalDelBanner={setShowModalDelete}
        banner={banner}
        setBanner={setBanner}
      />
    </div>
  );
};

export default TableBannerData;
