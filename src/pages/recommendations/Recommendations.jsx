import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const renderStars = (rating) => {
  const filledStars = Math.floor(rating);
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={i < filledStars ? "text-yellow-400" : "text-gray-300"}
      />
    );
  }

  return stars;
};

const Recommendations = ({ productName }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  useEffect(() => {
    const url = productName
      ? `https://smart-pickr-server.vercel.app/recommendations?productName=${encodeURIComponent(
          productName
        )}`
      : "https://smart-pickr-server.vercel.app/recommendations";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRecommendations(data);
        const initialCounts = {};
        data.forEach((rec) => {
          initialCounts[rec._id] = 0;
        });
        setHelpfulCounts(initialCounts);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [productName]);
  const handleHelpfulClick = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  return (
    <div className="mt-10 md:px-10 ">
      <h2 className="text-2xl font-bold mb-6">Top Recommendations</h2>

      {recommendations.length === 0 && (
        <p className="text-gray-500">No recommendations available.</p>
      )}

      {recommendations.map((rec) => (
        <div
          key={rec._id}
          className="shadow border rounded-lg p-5 mb-6 space-y-2"
        >
          {/* Profile */}
          <div className="flex items-center gap-3">
            <img
              src={rec.recommenderImg}
              alt={rec.recommenderName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="font-medium">{rec.recommenderName}</p>
          </div>

          {/* Star Rating + Title */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex">{renderStars(rec.rating || 4)}</div>
          </div>

          {/* Metadata */}
          <p className="text-sm text-gray-500">
            Reviewed on :{" "}
            {new Date(rec.timeStamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            <br />
            <span className="text-orange-600 font-semibold">
              Verified Purchase
            </span>
          </p>

          {/* Review Content */}
          <p className=" text-base italic">{rec.recommendationReason}</p>

          {/* Images if available */}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            <img
              src={rec.recommendedProductImage}
              alt={rec.recommendedProductName}
              className="h-24 w-full object-cover rounded"
            />
          </div>

          {/* Helpful / Report Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleHelpfulClick(rec._id)}
              className="px-4 py-1 border rounded-full text-sm hover:bg-blue-300"
            >
              Helpful ({helpfulCounts[rec._id] || 0})
            </button>
            <button className="px-4 py-1 border rounded-full text-sm hover:bg-blue-300">
              Report
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
