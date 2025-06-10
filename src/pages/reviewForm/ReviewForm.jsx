import { FaStar } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const ReviewForm = () => {
  const product = useLoaderData();
  const { _id } = product;

  // Mock rating data — replace with real backend data later
  const ratingData = {
    total: 6,
    breakdown: {
      5: 72,
      4: 0,
      3: 0,
      2: 0,
      1: 28,
    },
    average: 3.9,
  };

  return (
    <div className="mt-10 p-4 rounded-md w-full sm:max-w-md mx-auto  shadow text-black bg-white">
      {/* Rating Summary */}
      <div className="mb-8 border-b pb-6">
        <h2 className="text-xl font-semibold mb-2">Customer reviews</h2>

        <div className="flex items-center gap-2 mb-1">
          <div className="flex text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={
                  i < Math.round(ratingData.average) ? "#ffc107" : "#e4e5e9"
                }
              />
            ))}
          </div>
          <span className="text-lg font-medium">
            {ratingData.average.toFixed(1)} out of 5
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {ratingData.total} global ratings
        </p>

        {/* Star Breakdown Bars */}
        {Object.keys(ratingData.breakdown)
          .sort((a, b) => b - a)
          .map((star) => (
            <div key={star} className="flex items-center gap-2 text-sm mb-1">
              <span className="w-10">{star} star</span>
              <div className="relative w-full max-w-md h-3 bg-gray-200 rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-500 rounded"
                  style={{ width: `${ratingData.breakdown[star]}%` }}
                />
              </div>
              <span className="w-10 text-right">
                {ratingData.breakdown[star]}%
              </span>
            </div>
          ))}
      </div>

      {/* Write Review CTA */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-1">Review this product</h3>
        <p className="text-sm text-gray-600 mb-4">
          Share your thoughts with other customers
        </p>

        <Link to={`/productFeedback/${_id}`}>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
            Write a customer review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewForm;
