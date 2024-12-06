import React, { useState } from "react";
import { api } from "@/variable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/productType";
import Card from "./Card";
import NavigationBar from "./NavigationBar";
import { Input } from "@nextui-org/react";

const ProductList = () => {
  const fetchProducts = async () => {
    const res = await axios.get(api as string);

    return res.data;
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <div className="px-52">
      <NavigationBar>
        <Input type="text" label="search product" />
      </NavigationBar>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 pb-8 pt-0">
          {products
            .sort(function (a: Product, b: Product) {
              return parseFloat(b.rating) - parseFloat(a.rating);
            })
            .map((p: Product, index: number) => (
              <Card
                key={index}
                product_name={p.product_name}
                actual_price={p.actual_price}
                category={p.category}
                rating={p.rating}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
