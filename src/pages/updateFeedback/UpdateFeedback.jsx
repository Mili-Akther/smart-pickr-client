import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const UpdateFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:5000/product-application/${id}`)
        .then((res) => res.json())
        .then((data) => setFeedback(data));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const queryTitle = form.queryTitle.value;
    const boycottReason = form.boycottReason.value;

    const updatedFeedback = {
      queryTitle,
      boycottReason,
      date: new Date().toLocaleString("en-GB", { hour12: false }),
    };

    try {
      const res = await fetch(
        `http://localhost:5000/product-application/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFeedback),
        }
      );
          

      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Feedback updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myFeedbacks");
      } else {
        Swal.fire("Oops!", "Update failed. Try again.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  if (!feedback) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Update Feedback</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-3">
        <div>
          <label className="label font-semibold">Product Name</label>
          <input
            type="text"
            value={feedback.productName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Product Brand</label>
          <input
            type="text"
            value={feedback.productBrand}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold">Product Price</label>
          <input
            type="text"
            value={feedback.ProductPrice}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Product Title</label>
          <input
            name="queryTitle"
            defaultValue={feedback.queryTitle}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="label font-semibold">Boycott Reason</label>
          <textarea
            name="boycottReason"
            defaultValue={feedback.boycottReason}
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <button
          className="btn  text-white bg-blue-500 hover:bg-blue-600 mt-4"
          type="submit"
        >
          Update Feedback
        </button>
      </form>
    </div>
  );
};

export default UpdateFeedback;
