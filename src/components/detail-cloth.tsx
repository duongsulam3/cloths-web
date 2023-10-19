import { Cloth } from "@/types/backend";
import "@/styles/app.scss";
import ListSizes from "./list-size";

interface IPros {
  cloth: Cloth;
  path: string;
}

const DescriptionCloth = (props: IPros) => {
  let { cloth } = props;

  return (
    <>
      <h1>{cloth?.name}</h1>
      <h5 className="old-price">{cloth?.oldPrice}</h5>
      <h3>{cloth?.price + " " + cloth?.currency}</h3>
      <ListSizes path={props.path} />
    </>
  );
};

export default DescriptionCloth;
