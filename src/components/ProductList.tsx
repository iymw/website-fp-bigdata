import React, { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Product } from "@/productType";
import Card from "./Card";
import NavigationBar from "./NavigationBar";
import { Button, Input } from "@nextui-org/react";
import { fetchProducts } from "@/get";
import { searchProducts } from "@/search";
import Form from "./Form";
import { IoClose } from "react-icons/io5";

const ProductList = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string>("");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page, search),
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  const input = searchProducts(products?.data, search);

  const [kunci, setKunci] = useState<number>();

  useEffect(() => {
    const productsLength = async () => {
      const p = (await fetchProducts(page + 1, search)).length;

      if (p === 0) setKunci(page);
    };

    productsLength();
  }, [page]);

  const [openClose, setOpenClose] = useState<boolean>(false);

  return (
    <>
      <section className="px-8 lg:px-52">
        <NavigationBar>
          <Input
            className="w-full"
            label="search product"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            value={search}
          />
        </NavigationBar>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className="space-y-4">
            <p className="text-lg font-semibold">Main Products</p>
            <div className="grid grid-cols-2 gap-4 pb-8 pt-0 sm:grid-cols-3 lg:grid-cols-4">
              {input.ketemu &&
                input.ketemu
                  .sort(function (a: Product, b: Product) {
                    return parseFloat(b.rating) - parseFloat(a.rating);
                  })
                  .map((p: Product, index: number) => (
                    <Card
                      key={index}
                      actual_price={p.actual_price}
                      category={p.category}
                      img_link={p.img_link}
                      product_name={p.product_name}
                      rating={p.rating}
                    />
                  ))}
            </div>
          </section>
        )}
        {search && (
          <section className="space-y-4 pb-16 pt-8 text-[#2E2E2E]">
            <p className="text-lg font-semibold">Related Categories</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {input.rekomendasi &&
                input.rekomendasi
                  .sort(function (a: Product, b: Product) {
                    return parseFloat(b.rating) - parseFloat(a.rating);
                  })
                  .map((p: Product, index: number) => (
                    <Card
                      key={index}
                      actual_price={p.actual_price}
                      category={p.category}
                      img_link={p.img_link}
                      product_name={p.product_name}
                      rating={p.rating}
                    />
                  ))}
            </div>
          </section>
        )}
        {!search && (
          <div className="flex w-full items-center justify-between pb-16 pt-8">
            <>
              <p>{page + 1}</p>
              <div className="space-x-2">
                {[
                  {
                    check: page === 0,
                    name: "Prev",
                    onClick: () =>
                      setPage((prev) => (prev !== 0 ? prev - 1 : prev)),
                  },
                  {
                    check: page === kunci,
                    name: "Next",
                    onClick: () =>
                      setPage((prev) => (page === kunci ? prev : prev + 1)),
                  },
                ].map((i, index) => (
                  <Button
                    key={index}
                    className={i.check ? "cursor-not-allowed" : ""}
                    disabled={i.check}
                    onClick={i.onClick}
                    size="lg"
                  >
                    {i.name}
                  </Button>
                ))}
              </div>
            </>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductList;
