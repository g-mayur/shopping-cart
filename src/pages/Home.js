import React from "react";
import Product from "../components/Product";
import { products } from "../data";

const Home = () => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-screen-2xl mx-auto p-3 mt-4">
        {products.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
