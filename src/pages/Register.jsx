import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleRegister = (e) => {
    e.preventDefault();
    // get form data
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photo = form.get("photo");
    console.log({ name, email, photo, password });
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // show password validation error
    createUser(email, password)
    .then((result) => {
      const user = result.user;
      setUser(user)

      updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
        navigate("/");
        toast.success("Registration successful!");
      });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode,error.message);
        toast.error("Registration failed: " + error.message);
      });
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" shadow-2xl rounded-lg p-10 w-full max-w-lg">
        <h1 className="text-2xl text-center mb-4 font-bold ">Register now!</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium ">Your Name</label>
            <input
              name="name"
              type="text"
              className="w-full p-3 border rounded-md mt-1"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="w-full p-3 border rounded-md mt-1"
              placeholder="Enter your photo URL"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="w-full p-3 border rounded-md mt-1"
              placeholder="Enter your email address"
              required
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-md mt-1 pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[66%] transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" className="w-4 h-4" />
            <label className="text-sm ">
              Accept <span className="font-semibold">Term & Conditions</span>
            </label>
          </div>

          <button className="w-full bg-blue-600 font-semibold py-2 rounded hover:bg-blue-800 transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
