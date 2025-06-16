import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { Link } from "react-router";

const UserConcerns = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch("https://smart-pickr-server.vercel.app/queries")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => b.ProductPrice - a.ProductPrice);
        setQueries(sorted);
      });
  }, []);

  const handleRecommend = (id) => {
    fetch(
      `https://smart-pickr-server.vercel.app/product-application/recommend/${id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          setQueries((prev) =>
            prev.map((item) =>
              item._id === id
                ? { ...item, recommendationCount: item.recommendationCount + 1 }
                : item
            )
          );
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-black">
      <div className="bg-gray-100 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Community Feedback</h2>
      </div>

      {queries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {queries.map(
            ({
              _id,
              productName,
              productImage,
              recommendationCount,
              ProductPrice,
            }) => (
              <div
                key={_id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
              >
                <img
                  src={productImage}
                  alt="Product"
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-xl font-semibold mb-2">{productName}</h3>

                <p className="text-gray-600 text-sm mb-3">
                  Recommended by{" "}
                  <span className="font-bold">{recommendationCount}</span> user
                  {recommendationCount !== 1 ? "s" : ""}
                </p>
                <h2 className="text-gray-600 text-sm mb-3">{ProductPrice}</h2>

                <Link to={`/query-details/${_id}`}>
                  <button
                    onClick={() => handleRecommend(_id)}
                    className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600 border-none w-full flex items-center justify-center gap-2"
                  >
                    <FcLikePlaceholder className="text-lg" />
                    Recommend
                  </button>
                </Link>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg font-semibold">No queries found.</p>
        </div>
      )}
    </div>
  );
};

export default UserConcerns;
