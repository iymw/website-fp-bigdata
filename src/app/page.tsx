"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ProductList from "@/components/_sections/ProductList";

const Home = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
};

export default Home;
