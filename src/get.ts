import { api } from "./variable";

export const fetchProducts = async (page: number) => {
  const res = await fetch(`${api}/products?_page=${page}`);
  if (!res.ok) {
    throw new Error("There was an error!");
  }
  return res.json();
};
