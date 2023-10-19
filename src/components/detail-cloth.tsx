import { Cloth } from "@/types/backend";
import "@/styles/app.scss";
import ListSizes from "./list-size";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Space_Mono } from "next/font/google";

interface IPros {
  cloth: Cloth;
  path: string;
}

const DescriptionCloth = (props: IPros) => {
  let cloth = props.cloth;
  let idClothPath = props.path;

  const [listClothSizes, setListClothSizes] = useState([] as any);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getClothSize = async () => {
      try {
        const sizeClothCollectionRef = collection(db, idClothPath);
        const sectionSizes = query(
          sizeClothCollectionRef,
          orderBy("idSize", "asc")
        );
        const data = await getDocs(sectionSizes);
        const filterData = data?.docs.map((d) => ({ ...d.data() }));
        //console.log(filterData);
        setListClothSizes(filterData);
      } catch (e) {
        console.error(e);
      }
    };
    getClothSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{cloth?.name}</h1>
      <h5 className="old-price">{cloth?.oldPrice}</h5>
      <h3>{cloth?.price + " " + cloth?.currency}</h3>
      <ListSizes sizes={listClothSizes} />
      <p>
        Select quantity: <span>{quantity}</span>
      </p>
    </>
  );
};

export default DescriptionCloth;
