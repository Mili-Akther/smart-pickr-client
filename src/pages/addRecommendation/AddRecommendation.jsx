import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AddRecommendation = ({ queryData }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    recommendationTitle: "",
    recommendedProductName: "",
    recommendedProductImage: "",
    recommendationReason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
//     if (!queryData || !user) {
//       alert("Query data or user info is missing.");
//       return;
//     }

    const recommendation = {
      ...formData,
      queryId: queryData._id.toString(),
      queryTitle: queryData.ProductTitle,
      productName: queryData.ProductName,
      userEmail: queryData.applicant_email,
      userName: queryData.applicant_name,
      
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      recommenderImg: user.photoURL,
      timeStamp: new Date().toISOString(),

    };

    try {
      const res = await fetch("http://localhost:5000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recommendation),
      });

      if (!res.ok) {
        const error = await res.json();
        return alert("Failed: " + error.error || "Unknown error");
      }

      const data = await res.json();
      if (data.insertedId) {
        alert(" Recommendation added!");
        setFormData({
          recommendationTitle: "",
          recommendedProductName: "",
          recommendedProductImage: "",
          recommendationReason: "",
        });
      }
    } catch (err) {
      alert(" Submission error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border mt-6 rounded  shadow-sm"
    >
      <h2 className="text-lg font-bold">Add Recommendation</h2>
      <input
        name="recommendationTitle"
        value={formData.recommendationTitle}
        onChange={handleChange}
        placeholder="Recommendation Title"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="recommendedProductName"
        value={formData.recommendedProductName}
        onChange={handleChange}
        placeholder="Recommended Product Name"
        className="border p-2 w-full rounded"
        required
      />
      <input
        name="recommendedProductImage"
        value={formData.recommendedProductImage}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 w-full rounded"
        required
      />
      <textarea
        name="recommendationReason"
        value={formData.recommendationReason}
        onChange={handleChange}
        placeholder="Why are you recommending this?"
        className="border p-2 w-full rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600  px-4 py-2 rounded"
      >
        Add Recommendation
      </button>
    </form>
  );
};

export default AddRecommendation;
