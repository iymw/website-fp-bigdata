import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./productType";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "actual_price",
    header: "Price",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
];
