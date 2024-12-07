import { api } from "./variable";

export const fetchProducts = async (page: number) => {
  const res = await fetch(`${api}/products?_page=${page}`);
  if (!res.ok) {
    throw new Error("There was an error!");
  }

  const data = await res.json();
  return { data: data, length: data.length };
};
