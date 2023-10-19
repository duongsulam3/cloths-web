import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

import { useEffect, useState } from "react";

interface clothPath {
  path: string;
}

const ListSizes = (props: clothPath) => {
  const clothPath = props.path;
  const [listClothSizes, setListClothSizes] = useState([] as any);
  useEffect(() => {
    const getClothSize = async () => {
      try {
        const sizeClothCollectionRef = collection(db, clothPath);
        const data = await getDocs(sizeClothCollectionRef);
        const filterData = data?.docs.map((d) => ({ ...d.data() }));
        setListClothSizes(filterData);
      } catch (e) {
        console.error(e);
      }
    };
    getClothSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>{listClothSizes.length}</div>;
};

export default ListSizes;
