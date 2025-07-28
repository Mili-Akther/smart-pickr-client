import React from "react";
import { CgHeart, CgShoppingCart } from "react-icons/cg";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router";

const HotProductCard = ({ product }) => {
  const {
    ProductName,
    ProductBrand,
    ProductImageURL,
    ProductTitle,
    ProductPrice,
    _id,
  } = product;

  return (
    <div className="card flex flex-col lg:flex-row shadow-sm p-4 gap-6 border border-gray-500 mt-4">
      {/* Image Section */}
      <div className="flex-shrink-0 flex items-center justify-center lg:w-1/3">
        <img
          className="w-full max-w-xs md:max-w-[10.5rem] lg:max-w-full h-auto object-contain"
          src={ProductImageURL}
          alt={ProductName}
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between flex-grow lg:w-2/3">
        <div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs uppercase text-gray-500 font-medium">
              {ProductBrand}
            </p>
            <CgHeart className="cursor-pointer hover:text-blue-400" />
          </div>

          <h2 className="text-base font-bold mt-2 break-words leading-snug max-w-full md:text-sm">
            {ProductName}
          </h2>

          <p className="text-sm text-gray-600 mt-1 break-words max-w-full">
            {ProductTitle}
          </p>

          <span className="flex items-center font-semibold text-xl mt-2">
            <FaDollarSign className="text-md" />
            {ProductPrice}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
          <Link to={`/products/${_id}`} className="w-full sm:w-auto">
            <button className="btn btn-xs w-full sm:w-auto bg-blue-600 text-sm border-none md:w-[100px]">
              View Details
            </button>
          </Link>
          <CgShoppingCart className="text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default HotProductCard;
 