import React, { useEffect, useState } from "react";
import { FaStar, FaTrash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

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

const MyRecommendations = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchMyRecommendations();
    }
  }, [user]);

  const fetchMyRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://smart-pickr-server.vercel.app/my-recommendations?email=${encodeURIComponent(
          user.email
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      alert("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, recommendationTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the recommendation "${recommendationTitle}"?`
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoading(id);
      const response = await fetch(
        `https://smart-pickr-server.vercel.app/recommendations/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete recommendation");
      }

      // Remove the deleted recommendation from state
      setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
      alert("Recommendation deleted successfully!");
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      alert("Failed to delete recommendation: " + error.message);
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg"><Loading></Loading></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Recommendations</h1>

      {recommendations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            You haven't made any recommendations yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommended Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  For Query
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
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
                    <div className="flex">{renderStars(rec.rating || 4)}</div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rec.timeStamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {rec.recommendationReason}
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        handleDelete(rec._id, rec.recommendationTitle)
                      }
                      disabled={deleteLoading === rec._id}
                      className="text-red-600 hover:text-red-900 flex items-center gap-1 disabled:opacity-50"
                    >
                      <FaTrash className="w-4 h-4" />
                      {deleteLoading === rec._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyRecommendations;
