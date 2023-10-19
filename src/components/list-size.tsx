import { SizesCloth } from "@/types/backend";

interface IPros {
  sizes: SizesCloth[];
}

const ListSizes = (props: IPros) => {
  let { sizes } = props;
  //console.log(sizes);

  return (
    <div style={{ display: "flex" }}>
      {sizes.map((size, i) => {
        return (
          <div key={i} className="size-container-box">
            {size?.size}
          </div>
        );
      })}
    </div>
  );
};

export default ListSizes;
