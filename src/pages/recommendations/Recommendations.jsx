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

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [helpfulCounts, setHelpfulCounts] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/recommendations")
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
  }, []);

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

// import React, { useEffect, useState } from "react";

// const renderStars = (rating) => {
//   const filledStars = Math.floor(rating);
//   const stars = [];

//   for (let i = 0; i < 5; i++) {
//     stars.push(
//       <span
//         key={i}
//         className={i < filledStars ? "text-yellow-400" : "text-gray-300"}
//       >
//         ★
//       </span>
//     );
//   }

//   return stars;
// };

// const Recommendations = () => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [helpfulCounts, setHelpfulCounts] = useState({});

//   useEffect(() => {
//     fetch("http://localhost:5000/recommendations")
//       .then((res) => res.json())
//       .then((data) => {
//         setRecommendations(data);

//         // Initialize helpful counts
//         const initialCounts = {};
//         data.forEach((rec) => {
//           initialCounts[rec._id] = 0;
//         });
//         setHelpfulCounts(initialCounts);
//       })
//       .catch((err) => console.error("Fetch error:", err));
//   }, []);

//   const handleHelpfulClick = (id) => {
//     setHelpfulCounts((prev) => ({
//       ...prev,
//       [id]: prev[id] + 1,
//     }));
//   };

//   return (
//     <div className="mt-10 px-4 md:px-10">
//       <h2 className="text-2xl font-bold mb-6">Top Recommendations</h2>

//       {recommendations.length === 0 && (
//         <p className="text-gray-500">No recommendations available.</p>
//       )}

//       {recommendations.map((rec) => (
//         <div
//           key={rec._id}
//           className=" shadow-sm border rounded-lg p-5 mb-6 flex flex-col md:flex-row gap-4"
//         >
//           {/* Recommender Profile */}
//           <div className="flex items-start gap-3">
//             <img
//               src={rec.recommenderImg}
//               alt={rec.recommenderName}
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold text-lg">{rec.recommenderName}</p>
//               <p className="text-sm text-gray-500">
//                 {new Date(rec.timeStamp).toLocaleString()}
//               </p>
//               {/* <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">

//               </span> */}
//             </div>
//           </div>

//           {/* Review Content */}
//           <div className="flex-1 mt-4 md:mt-0 md:ml-4">
//             <div className="flex items-center gap-2 text-sm text-yellow-500 mb-1">
//               {renderStars(rec.rating || 4)}
//               <span className="text-gray-500 ml-2">({rec.rating || 4}.0)</span>
//             </div>

//             <p className="text-gray-800 text-base italic">
//               “{rec.recommendationReason}”
//             </p>

//             <div className="flex items-center gap-4 mt-4">
//               <img
//                 src={rec.recommendedProductImage}
//                 alt={rec.recommendedProductName}
//                 className="w-24 h-24 object-cover rounded border"
//               />
//               <div>
//                 <p className="text-sm text-gray-500">Recommended Product:</p>
//                 <p className="font-semibold">{rec.recommendedProductName}</p>
//               </div>
//             </div>

//             <button
//               onClick={() => handleHelpfulClick(rec._id)}
//               className="mt-4 text-sm text-blue-600 hover:underline"
//             >
//               Helpful ({helpfulCounts[rec._id] || 0})
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Recommendations;
