import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const AddFeedback = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://smart-pickr-server.vercel.app/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const submitProductFeedback = async (e) => {
    e.preventDefault();
    const form = e.target;
    const productTitle = form.productTitle.value;
    const boycottReason = form.boycottReason.value;

    const productFeedback = {
      product_id: id,
      applicant_email: user.email,
      productName: product.ProductName,
      productBrand: product.ProductBrand,
      productImage: product.ProductImageURL,
      ProductPrice: product.ProductPrice,
      queryTitle: productTitle,
      boycottReason: boycottReason,
      userName: user.displayName,
      userImage: user.photoURL,
      // date: Date.now(),
      date: new Date().toLocaleString("en-GB", { hour12: false }),

      recommendationCount: 0,
    };

    try {
      const res = await fetch(
        "https://smart-pickr-server.vercel.app/product-application",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productFeedback),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your feedback has been submitted!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myFeedbacks");
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to submit feedback. Please try again!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again!",
      });
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Submit Product Feedback
      </h1>

      <form onSubmit={submitProductFeedback} className="flex flex-col gap-3">
        {/* Product Name */}
        <div>
          <label className="label font-semibold">Product Name</label>
          <input
            name="productName"
            type="text"
            value={product.ProductName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Brand */}
        <div>
          <label className="label font-semibold">Product Brand</label>
          <input
            name="productBrand"
            type="text"
            value={product.ProductBrand}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        {/* Product Price */}
        <div>
          <label className="label font-semibold">Product Price</label>
          <input
            name="productProductPrice"
            type="text"
            value={product.ProductPrice}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Image URL */}
        <div>
          <label className="label font-semibold">Product Image URL</label>
          <input
            type="text"
            value={product.ProductImageURL}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Product Title */}
        <div>
          <label className="label font-semibold">Product Title</label>
          <input
            name="productTitle"
            type="text"
            placeholder="Is there any better product that gives me the same quality?"
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Boycotting Reason Details */}
        <div>
          <label className="label font-semibold">
            Boycotting Reason Details
          </label>
          <textarea
            name="boycottReason"
            required
            placeholder="Share your reason why you’re boycotting or your concern..."
            className="textarea textarea-bordered w-full"
          />
        </div>

        <button
          className="btn  mt-4 text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Submit Now
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
