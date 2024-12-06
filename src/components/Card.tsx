import { Product } from "@/productType";
import { Image } from "@nextui-org/image";
import React from "react";
import { FaStar } from "react-icons/fa";

const Card = ({ product_name, actual_price, category, rating }: Product) => {
  return (
    <section>
      <div className="w-full space-y-4">
        <Image
          className="!w-full object-cover"
          src="/placeholder.jpg"
          alt="Placeholder"
          width={0}
        />
        <div className="space-y-2">
          <p className="text-sm">{product_name?.slice(0, 20)} ...</p>
          <p>₹{actual_price?.slice(3)}</p>
          <p className="text-sm text-[#2E2E2E]">
            Category: <br /> {category?.slice(0, 20)} ...
          </p>
          <div className="flex items-center gap-2">
            <FaStar color="#FFC400" size={20} />
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
