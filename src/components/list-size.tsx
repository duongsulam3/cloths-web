import { SizesCloth } from "@/types/backend";
import { useState } from "react";

interface IPros {
  sizes: SizesCloth[];
}

const ListSizes = ({
  sizes,
  onSelectSize,
}: IPros & { onSelectSize: (selectedSize: string) => void }) => {
  const [selectedSize, setSelectedSize] = useState<SizesCloth | null>(null);
  //console.log(sizes);

  return (
    <div style={{ display: "flex" }}>
      {sizes?.map((size, i) => {
        return (
          <div
            key={i}
            className={
              selectedSize === size
                ? "size-selected-container-box"
                : "size-container-box"
            }
            onClick={() => {
              setSelectedSize(size), onSelectSize(size.size);
            }}
          >
            {size.size}
          </div>
        );
      })}
    </div>
  );
};

export default ListSizes;
