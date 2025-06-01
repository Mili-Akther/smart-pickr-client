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
    ProductDescription,
    category,
    ProductPrice,
    _id,
  } = product;

  return (
    <div className="card flex flex-row shadow-sm p-4 gap-4 border border-gray-500 mt-4">
      {/* Image Section */}
      <div className="flex-shrink-0  flex items-center justify-center">
        <img
          className="w-42 h-42 object-contain"
          src={ProductImageURL}
          alt={ProductName}
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-between flex-grow">
        <div className="">
          <div className="flex justify-between">
            <p className="text-xs uppercase text-gray-500 font-medium">
              {ProductBrand}
            </p>
            <CgHeart className="cursor-pointer hover:text-blue-400" />
          </div>
          <h2 className="text-base font-bold mt-2">{ProductName}</h2>

          <p className="text-sm text-gray-600 mt-1">{ProductTitle}</p>
          <div className="badge p-2 bg-blue-600">SALE</div>
          <span className="flex items-center font-semibold text-xl mt-2">
            <FaDollarSign className="text-md" />
            {ProductPrice}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4 ">
          <Link to={`/products/${_id}`}>
            <button className="btn btn-xs bg-blue-600 text-sm">
              View Details
            </button>
          </Link>
          <CgShoppingCart className="text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default HotProductCard;
 