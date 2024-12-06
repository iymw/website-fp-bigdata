// import { Catalog } from "@/components/Catalog";
// import React from "react";
// import DataCatalog from "@/dataCatalog";
// import { columns } from "@/columns";

// const Home = async () => {
//   const data = await DataCatalog();
//   return <Catalog columns={columns} data={data} />;
// };

// export default Home;

import NavigationBar from "@/components/NavigationBar";
import React from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import ProductList from "@/components/ProductList";

const Home = () => {
  // const queryClient = new QueryClient();

  return (
    // <QueryClientProvider client={queryClient}>
    //   <ProductList />
    // </QueryClientProvider>
    <NavigationBar />
  );
};

export default Home;
