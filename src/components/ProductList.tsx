import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/productType";

// Define the `fetchProducts` function to fetch data from the API
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:5000");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

const ProductList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data = [],
    isLoading,
    error,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  // Filter products based on `searchTerm`
  const filteredProducts = data.filter((product) => {
    const searchWords = searchTerm.trim().toLowerCase().split(" ");
    return searchWords.every((word) =>
      product.product_name.toLowerCase().includes(word),
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((product, index) => (
          <div key={index} className="border p-4">
            <img
              src={product.img_link}
              alt={product.product_name}
              className="w-24 h-24"
            />
            <h3>Nama: {product.product_name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: {product.actual_price}</p>
            <p>Rating: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
