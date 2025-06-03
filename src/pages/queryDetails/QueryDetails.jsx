import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QueryDetails = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/queries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuery(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!query) {
    return <div className="text-center p-6">Query not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-black">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={query.productImage}
          alt={query.productName}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{query.productName}</h2>
        <p className="text-sm text-gray-600 mb-2">
          Recommendation Count: <strong>{query.recommendationCount}</strong>
        </p>
        <p className="text-base text-gray-700">
          Boycott Reason: <br />
          {query.boycottReason || "No reason provided."}
        </p>
      </div>
    </div>
  );
};

export default QueryDetails;
