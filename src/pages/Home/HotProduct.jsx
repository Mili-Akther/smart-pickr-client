import React, { useEffect, useState } from "react";
import HotProductCard from "./HotProductCard";
import Loading from "../Loading";

const HotProduct = () => {
  const [products, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://smart-pickr-server.vercel.app/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-12 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Trending Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <HotProductCard key={product._id} product={product}></HotProductCard>
        ))}
      </div>
    </div>
  );
};

export default HotProduct;
