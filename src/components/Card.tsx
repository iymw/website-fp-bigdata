import { Product } from "@/productType";
import { Image } from "@nextui-org/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const Card = ({
  actual_price,
  category,
  img_link,
  product_name,
  rating,
}: Product) => {
  return (
    <div className="space-y-4">
      <Image
        className="h-48 w-full object-cover"
        src={img_link}
        alt="Placeholder"
        width="100%"
      />
      <div className="space-y-2">
        <p className="text-sm">{product_name?.slice(0, 20)} ...</p>
        <p>{actual_price}</p>
        <p className="text-sm text-[#2E2E2E]">
          Category: <br /> {category?.slice(0, 20)} ...
        </p>
        <div className="flex items-center gap-2">
          <FaStar color="#FFC400" size={20} />
          <p>{rating}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
