import { api_1 } from "./variable";

export const fetchProducts = async (page: number, search: string) => {
  const res = await fetch(`${api_1}/products${search ? "" : `?_page=${page}`}`);
  if (!res.ok) {
    throw new Error("There was an error!");
  }

  const data = await res.json();
  return { data: data, length: data.length };
};
