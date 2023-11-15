import { Cloth } from "@/types/backend";
import "@/styles/app.scss";
import ListSizes from "./list-size";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Button, Placeholder } from "react-bootstrap";
import { DescriptionPlaceHolder } from "./description-placeholder";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

interface IPros {
  cloth: Cloth;
  path: string;
}

const DescriptionCloth = (props: IPros) => {
  const { addToCart } = useCart();
  let { cloth, path } = props;
  const route = useRouter();

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
    if (quantity == 1) {
      return null;
    } else setQuantity(quantity - 1);
  };
  const handleAddClick = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      idItem: cloth.idCloth,
      nameItem: cloth.name,
      priceItem: cloth.price,
      quantityItem: quantity,
      totalPriceItem: cloth.price * quantity,
    });
    route.back();
  };

  return (
    <>
      <h1>{cloth?.name}</h1>
      <h5 className="old-price">{cloth?.oldPrice}</h5>
      <h3 className="sale-price-detail-page">
        {cloth?.price + " " + cloth?.currency}
      </h3>
      <ListSizes sizes={listClothSizes} />
      <p className="p-quantity">
        Select quantity:
        <Button
          className="margin-left-10"
          onClick={handleRemoveClick}
          variant="outline-secondary"
        >
          -
        </Button>
        <span className="span-margin-l-r-10">{quantity}</span>
        <Button onClick={handleAddClick} variant="outline-secondary">
          +
        </Button>
      </p>
      <h5>Description</h5>
      <p className="block-ellipsis-detail">{cloth?.description}</p>
      <Button className="btn-add-to-cart" onClick={handleAddToCart} size="lg">
        <span className="material-icons" style={{ paddingRight: "10px" }}>
          shopping_cart
        </span>
        Add To Cart
      </Button>
    </>
  );
};

export default DescriptionCloth;
