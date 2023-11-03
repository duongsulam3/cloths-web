import { Cloth } from "@/types/backend";
import "@/styles/app.scss";
import ListSizes from "./list-size";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Button, Placeholder } from "react-bootstrap";
import { DescriptionPlaceHolder } from "./description-placeholder";

interface IPros {
  cloth: Cloth;
  path: string;
}

const DescriptionCloth = (props: IPros) => {
  let { cloth, path } = props;

  const [listClothSizes, setListClothSizes] = useState([] as any);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getClothSize = async () => {
      try {
        const sizeClothCollectionRef = collection(db, path);
        const sectionSizes = query(
          sizeClothCollectionRef,
          orderBy("idSize", "asc")
        );
        const data = await getDocs(sectionSizes);
        const filterData = data?.docs.map((d) => ({ ...d.data() }));
        setListClothSizes(filterData);
      } catch (e) {
        console.error(e);
      }
    };
    getClothSize();
  }, [path]);

  if (!cloth) {
    return <DescriptionPlaceHolder />;
  }

  const handleRemoveClick = () => {
    setQuantity(quantity - 1);
  };
  const handleAddClick = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <h1>{cloth?.name}</h1>
      <h5 className="old-price">{cloth?.oldPrice}</h5>
      <h3 style={{ marginBottom: "20px", color: "red" }}>
        {cloth?.price + " " + cloth?.currency}
      </h3>
      <ListSizes sizes={listClothSizes} />
      <p className="p-quantity">
        Select quantity:
        <Button
          style={{ marginLeft: "10px" }}
          onClick={handleRemoveClick}
          variant="outline-secondary"
        >
          -
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}>
          {quantity}
        </span>
        <Button onClick={handleAddClick} variant="outline-secondary">
          +
        </Button>
      </p>
      <h5>Description</h5>
      <p className="block-ellipsis-detail">{cloth?.description}</p>
      <Button
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        size="lg"
      >
        <span className="material-icons" style={{ paddingRight: "10px" }}>
          shopping_cart
        </span>
        Add To Cart
      </Button>
    </>
  );
};

export default DescriptionCloth;
