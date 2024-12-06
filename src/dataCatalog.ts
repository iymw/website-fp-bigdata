import { Product } from "./productType";
import { api } from "@/variable";

const DataCatalog = async (): Promise<Product[]> => {
  const data = await fetch(api as string);

  return data.json();
};

export default DataCatalog;
