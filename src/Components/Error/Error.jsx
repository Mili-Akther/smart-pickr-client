import React from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import bg404 from "../../assets/img/404.jpg"; 
import FuzzyText from "./FuzzyText";

const Error = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white px-4 overflow-hidden">
      {/* Background Image */}
      <img
        src={bg404}
        alt="404 Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center max-w-xl w-full">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">SmartPickr</h1>
       
        <FuzzyText baseIntensity={0.1} hoverIntensity={0.3} enableHover={true}>
          404 - Page Not Found
        </FuzzyText>
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search then state your source path"
            className="input input-bordered w-full max-w-md text-black mt-6"
          />
          <button className="btn bg-blue-400 hover:bg-blue-500 text-black ml-2 mt-6">
            <FaSearch />
          </button>
        </div>

        <div className="mb-4">
          <NavLink to="/" className="btn btn-info">
            BACK TO HOME
          </NavLink>
        </div>

        <p className="text-blue-200 underline cursor-pointer hover:text-blue-600">
          Helpful Search
        </p>
      </div>
    </div>
  );
};

export default Error;