import { Product } from "./productType";

export const searchProducts = (products: Product[], search: string) => {
  const ketemu = products?.filter((p: Product) => {
    const words = search.trim().toLowerCase().split(" ");

    return words.every((w) => p.product_name?.toLowerCase().includes(w));
  });

  return ketemu;
};
