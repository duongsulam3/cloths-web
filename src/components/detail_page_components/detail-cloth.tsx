import { Cloth } from "@/types/backend";
import "@/styles/app.scss";
import ListSizes from "./list-size";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Button, Placeholder, Row } from "react-bootstrap";
import { DescriptionPlaceHolder } from "../place_holder/description-placeholder";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/context/authContext";
import { useFav } from "@/context/favContext";

interface IPros {
  cloth: Cloth;
  path: string;
}

const DescriptionCloth = (props: IPros) => {
  const { cloth, path } = props;
  const { addToCart } = useCart();
  const { addToFav } = useFav();
  const { user } = UserAuth();

  const route = useRouter();

  const [listClothSizes, setListClothSizes] = useState([] as any);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

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
        // console.log(filterData);
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
      imgItem: cloth.img,
      sizeItem: selectedSize == "" ? "XS" : selectedSize,
      priceItem: cloth.price,
      quantityItem: quantity,
      totalPriceItem: cloth.price * quantity,
    });
    route.push("/cart");
  };

  const handleAddToFav = () => {
    if (user) {
      addToFav({
        itemID: cloth?.idCloth,
        itemName: cloth?.name,
      });
    } else {
      alert("You have to login to use this feature! Go to login page?");
      route.push("/login");
    }
  };

  return (
    <>
      <h1>{cloth?.name}</h1>
      <h5 className="old-price">{cloth?.oldPrice}</h5>
      <h3 className="sale-price-detail-page">
        {cloth?.price + " " + cloth?.currency}
      </h3>
      <ListSizes
        sizes={listClothSizes}
        onSelectSize={(selectedSize) => setSelectedSize(selectedSize)}
      />
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
      <div className="div-btn-fav-cart">
        <Button className="btn-favorite" onClick={handleAddToFav} size="lg">
          <span className="material-icons">favorite</span>
        </Button>
        <Button className="btn-add-to-cart" onClick={handleAddToCart} size="lg">
          <span className="material-icons" style={{ paddingRight: "10px" }}>
            shopping_cart
          </span>
          Add To Cart
        </Button>
      </div>
    </>
  );
};

export default DescriptionCloth;
