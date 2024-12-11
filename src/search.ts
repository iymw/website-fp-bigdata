import { Product } from "./productType";

export const searchProducts = (products: Product[], search: string) => {
  products = Array.from(
    new Map(products?.map((p) => [p.product_name, p])).values(),
  );

  const ketemu = products?.filter((p: Product) => {
    const words = search.trim().toLowerCase().split(" ");

    return words.every((w) => p.product_name?.toLowerCase().includes(w));
  });

  const rekomendasi = products?.filter((p: Product) => {
    return (
      ketemu.some((k: Product) => k.category === p.category) &&
      !ketemu.some((k: Product) => k.product_name === p.product_name)
    );
  });

  return { ketemu, rekomendasi };
};
