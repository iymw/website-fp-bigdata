import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Product } from "@/productType";
import Card from "./Card";
import NavigationBar from "./NavigationBar";
import { Button, Input } from "@nextui-org/react";
import { fetchProducts } from "@/get";
import { searchProducts } from "@/search";

const ProductList = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  const ketemu = searchProducts(products, search);

  return (
    <section className="px-52">
      <NavigationBar>
        <Input
          label="search product"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          value={search}
        />
      </NavigationBar>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 pb-8 pt-0">
          {ketemu &&
            ketemu
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
      <div className="flex w-full items-center justify-between pb-16 pt-8">
        <p>{page + 1}</p>
        <div className="space-x-2">
          {[
            {
              className: page === 0 ? "cursor-not-allowed" : "",
              disabled: page === 0,
              name: "Prev",
              onClick: () => setPage((prev) => (prev !== 0 ? prev - 1 : prev)),
            },
            {
              className: "",
              disabled: false,
              name: "Next",
              onClick: () => setPage((prev) => prev + 1),
            },
          ].map((i, index) => (
            <Button
              key={index}
              className={i.className}
              disabled={i.disabled}
              onClick={i.onClick}
              size="lg"
            >
              {i.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
