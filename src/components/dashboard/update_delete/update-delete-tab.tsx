import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import TableBannerData from "./table.banner.data";

const UpdateAndDeleteTab = () => {
  const [bannerList, setBannerList] = useState([] as any);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBannerList = async () => {
      try {
        const bannerCollectionRef = collection(db, "banner");
        const data = await getDocs(bannerCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
        }));
        setBannerList(filterData);
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getBannerList();
  }, []);

  return (
    <>
      {loading ? <Spinner></Spinner> : <TableBannerData banners={bannerList} />}
    </>
  );
};

export default UpdateAndDeleteTab;
