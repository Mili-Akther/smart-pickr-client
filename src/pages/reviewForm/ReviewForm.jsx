import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const product = useLoaderData();

  const {
    _id,
  } = product;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating,
      name,
      review,
      _id,
    };
    console.log("Submitted Review:", reviewData);
   
  };

  return (
    <div className=" p-6 rounded-md max-w-7xl mx-auto mt-10 shadow text-black  bg-white ">
      <h3 className="text-lg font-semibold mb-4">Your Review</h3>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => {
          const starValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                className="hidden"
                value={starValue}
                onClick={() => setRating(starValue)}
              />
              <FaStar
                size={24}
                className="cursor-pointer transition"
                color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              />
            </label>
          );
        })}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />

        <textarea
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-2 h-28 border rounded-md"
          required
        />

    
               <div className="w-full sm:w-[230px]">
                 <Link to={`/productFeedback/${_id}`}>
                   <button className="btn bg-blue-600 text-white w-full h-14 text-sm sm:text-base hover:bg-blue-700">
                     Submit Product Feedback
                   </button>
                 </Link>
               </div>
      </form>
    </div>
  );
};

export default ReviewForm;
