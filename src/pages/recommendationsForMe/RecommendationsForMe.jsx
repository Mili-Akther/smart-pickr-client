import React, { useEffect, useState } from "react";
import { FaStar, FaUser, FaCalendarAlt, FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

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

const RecommendationsForMe = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecommendations = async () => {
      try {
        console.log("🔔 Fetching recommendations-for-me for:", user.email);
        const res = await fetch(
          `https://smart-pickr-server.vercel.app/recommendations-for-me?email=${encodeURIComponent(
            user.email
          )}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await res.json();
        console.log("📥 Data from server:", data);
        setRecommendations(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        alert("Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user?.email]);

  const handleViewDetails = (recommendation) => {
    setSelectedRecommendation(recommendation);
  };

  const closeModal = () => {
    setSelectedRecommendation(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading recommendations for you...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Recommendations For Me
      </h1>
      <p className="text-gray-600 mb-6">
        See what others have recommended for your queries
      </p>

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No one has made recommendations for your queries yet.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommended Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    For My Query
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommended By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recommendations.map((rec) => (
                  <tr key={rec._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={rec.recommendedProductImage}
                          alt={rec.recommendedProductName}
                          className="w-12 h-12 rounded object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {rec.recommendedProductName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {rec.recommendationTitle}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {rec.queryTitle}
                      </div>
                      <div className="text-sm text-gray-500">
                        {rec.productName}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={rec.recommenderImg}
                          alt={rec.recommenderName}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {rec.recommenderName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {rec.recommenderEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex">{renderStars(rec.rating || 4)}</div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FaCalendarAlt className="w-3 h-3 mr-1" />
                        {new Date(rec.timeStamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(rec)}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <FaEye className="w-4 h-4" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for viewing full details */}
          {selectedRecommendation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold">
                      Recommendation Details
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Recommended Product
                      </h3>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedRecommendation.recommendedProductImage}
                          alt={selectedRecommendation.recommendedProductName}
                          className="w-20 h-20 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">
                            {selectedRecommendation.recommendedProductName}
                          </p>
                          <p className="text-gray-600">
                            {selectedRecommendation.recommendationTitle}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        For Your Query
                      </h3>
                      <p className="font-medium">
                        {selectedRecommendation.queryTitle}
                      </p>
                      <p className="text-gray-600">
                        {selectedRecommendation.productName}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Recommended By
                      </h3>
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedRecommendation.recommenderImg}
                          alt={selectedRecommendation.recommenderName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-medium">
                            {selectedRecommendation.recommenderName}
                          </p>
                          <p className="text-gray-600">
                            {selectedRecommendation.recommenderEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Rating</h3>
                      <div className="flex">
                        {renderStars(selectedRecommendation.rating || 4)}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Why This Recommendation?
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRecommendation.recommendationReason}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Recommended On
                      </h3>
                      <p className="text-gray-600">
                        {new Date(
                          selectedRecommendation.timeStamp
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <button
                      onClick={closeModal}
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecommendationsForMe;
