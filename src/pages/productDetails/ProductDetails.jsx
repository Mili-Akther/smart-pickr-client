// src/components/ProductDetails.jsx
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaPhone } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";
import ReviewForm from "../reviewForm/ReviewForm";

const ProductDetails = () => {
  const product = useLoaderData();

  const {
    ProductName,
    ProductPrice,
    ProductDescription,
    ProductImageURL,
    sku,
    category,
    _id,
  } = product;

  const [selectedImage, setSelectedImage] = useState(ProductImageURL?.[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="max-w-6xl mx-auto py-10 grid md:grid-cols-2 ">
      {/* LEFT: Image Gallery */}
      <div>
        <motion.img
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full object-contain rounded-lg shadow-md "
        />
        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          <img
            key={ProductImageURL}
            onClick={() => setSelectedImage(ProductImageURL)}
            src={ProductImageURL}
            alt=""
            className="w-92 h-92 cursor-pointer object-cover border border-gray-600 rounded p-4"
          />
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">{ProductName}</h1>
        <p className="text-2xl  font-semibold">
          <span className="text-blue-500">Regular Price</span> <br />$
          {ProductPrice}
        </p>
        <p className="text-gray-600">{ProductDescription}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <input
            type="number"
            className="input input-bordered w-16 text-center"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
          <button
            className="btn btn-sm"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
          <button className="btn bg-blue-600 ml-4 flex gap-2 items-center">
            <FaShoppingCart /> ADD TO CART
          </button>
        </div>

        {/* Wishlist */}
        <button className="flex gap-1 items-center text-sm text-gray-500 hover: transition">
          <FaHeart /> Add to wishlist
        </button>

        {/* SKU, Category */}
        <div className="mt-2 text-sm text-gray-500">
          <p>
            SKU: <span className="font-semibold">{sku}</span>
          </p>
          <p>
            Category: <span className="font-semibold">{category}</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6  mt-6">
          {/* Help Box */}
          <div className="bg-base-200 rounded shadow-sm px-4 h-14 flex items-center w-full sm:w-[280px]">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <FaPhone />
              <span>Need help? Call Us: 9845364827312</span>
            </div>
          </div>

          {/* Submit Feedback Button */}
          <div className="w-full sm:w-[230px]">
            <Link to={`/productFeedback/${_id}`}>
              <button className="btn bg-blue-600 text-white w-full h-14 text-sm sm:text-base hover:bg-blue-700">
                Submit Product Feedback
              </button>
            </Link>
          </div>
          <Link to={`/product-application/${product._id}`}>
            View Recommendations
          </Link>
        </div>
      </div>
      <div className="">
        <ReviewForm></ReviewForm>
      </div>
    </div>
  );
};

export default ProductDetails;
