import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';

const LogIn = () => {
  const { signInUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser (email, password)
    .then(result =>{
      const user = result.user;
      setUser(user);
      navigate(location?.state ? location.state : "/");
    })
    .catch((err) => {
      setError({ ...error, login: err.code });
    });
};
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      <div className="w-full max-w-lg p-10 rounded-lg shadow-2xl">
        <h1 className="text-center mt-8 mb-12 text-5xl font-bold ">Login now!</h1>
        <form onSubmit={handleSignIn}>
          <div className="mb-4 ">
            <label className="block mb-1 font-medium ">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email "
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-6 ">
            <label className="block mb-1 font-medium ">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error.login && (
            <label className="label flex text-sm text-orange-600">
              {error.login}
            </label>
          )}

          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot Password?
            </a>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600  font-semibold py-2 rounded hover:bg-blue-800 transition"
          >
            Login
          </button>
          <p className="text-center text-sm mt-4">
            Don’t Have An Account?{" "}
            <Link to="/register" className="text-orange-500 font-medium">
              Register
            </Link>
          </p>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-gray-400 text-sm">or</span>
        </div>

        <button
       
          className="w-full flex items-center justify-center gap-2 bg-blue-600  text-white py-2 rounded hover:bg-blue-800 transition"
        >
          <FaGoogle></FaGoogle>
          Continue with Google
        </button>
      </div>
    </div>
  ); 
};

export default LogIn;