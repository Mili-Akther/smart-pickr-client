import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";

const ShopAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
     
        const sortedData = [...data].sort(
          (a, b) => b.ProductPrice - a.ProductPrice
        );
        setProducts(sortedData);
      });
  }, []);

  const handleSortByPrice = () => {
    const sorted = [...products].sort((a, b) => {
      return sortOrder === "asc"
        ? a.ProductPrice - b.ProductPrice
        : b.ProductPrice - a.ProductPrice;
    });
    setProducts(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Shop All Products</h1>

      {/* Sort Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSortByPrice}
          className="font-semibold py-2 px-4 rounded btn btn-sm mt-3 bg-blue-600 text-white hover:bg-blue-700"
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <img
              src={product.ProductImageURL}
              alt={product.ProductName}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">
              {product.ProductName}
            </h2>
            <p className="text-gray-600">{product.ProductBrand}</p>
            <p className="text-blue-600 font-bold">${product.ProductPrice}</p>

            {/* Recommend Buttons */}
            <div className="mt-3 flex items-center gap-1">
              <button className="btn btn-xs bg-blue-400 text-white hover:bg-blue-600 rounded-full">
                Recommendation Count
              </button>
              <button className="btn btn-xs bg-blue-300 text-white hover:bg-blue-500 rounded-full">
                <FcLikePlaceholder />
                Recommend
              </button>
            </div>

            <button className="btn btn-sm mt-3 w-full bg-blue-500 text-white hover:bg-blue-600">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopAllProducts;
