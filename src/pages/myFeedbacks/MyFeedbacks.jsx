import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { FcViewDetails } from 'react-icons/fc';

const MyFeedbacks = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/product-Feedback?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const sortedData = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setProducts(sortedData);
        });
    }
  }, [user?.email]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/product-Feedback/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your query has been deleted.", "success");
              setProducts(products.filter((product) => product._id !== id));
            }
          });
      }
    });
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-black">
      {/* Banner Section */}
      <div className="bg-gray-100 p-6 rounded-xl flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">My Feedbacks</h2>
        <Link to={"/products/:id"}>
          <button className="btn btn-sm ml-2 text-white bg-blue-500 hover:bg-blue-600 border-none">
            Add Product Feedback
          </button>
        </Link>
      </div>

      {/* Query List Section */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(({ _id, productImage, queryTitle, boycottReason }) => (
            <div
              key={{ _id }}
              className="bg-white shadow-lg rounded-lg p-4 space-y-3 border"
            >
              <img
                src={productImage}
                alt=""
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold">{queryTitle}</h3>
              <p className="text-sm text-gray-600">{boycottReason}</p>
              <div className="flex justify-between">
                <Link to={`/products/${_id}`}>
                  <button
                    onClick={() => navigate(`/query-details/${_id}`)}
                    className="btn btn-sm  bg-blue-500 hover:bg-blue-600 border-none"
                  >
                    <FcViewDetails /> View Details
                  </button>
                </Link>
                <button
                  onClick={() => navigate(`/update-query/${_id}`)}
                  className="btn btn-sm btn-warning"
                >
                  <FaEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="btn btn-sm btn-error"
                >
                  <RiDeleteBin2Fill /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg font-semibold">No Product found!</p>
          <Link to="/productFeedback">
            <button className="btn btn-sm ml-2 text-white bg-blue-500 hover:bg-blue-600">
              Add Product Feedback
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
      
export default MyFeedbacks;