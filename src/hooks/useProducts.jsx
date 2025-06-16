import axios from "axios";
import React, { useEffect, useState } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("https://smart-pickr-server.vercel.app/products").then((res) => {
      setLoading(false);
      setProducts(res.data);
    });
  }, []);
  return { products, loading };
};

export default useProducts;
