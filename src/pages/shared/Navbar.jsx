import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  CgProfile,
  CgSearch,
  CgArrowsExchange,
  CgHeart,
  CgShoppingCart,
} from "react-icons/cg";
import logo from "../../assets/technology-logo/technology-50.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(
      `https://smart-pickr-server.vercel.app/products/search?query=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Search Results:", data);
      });
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 1) {
      fetch(
        `https://smart-pickr-server.vercel.app/products/search?query=${value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setShowDropdown(true);
        });
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  };
  const handleSelectSuggestion = (item) => {
    console.log("Selected item:", item);
    setSearch(item.ProductName);
    setSuggestions([]);
    setShowDropdown(false);
    navigate(`/products/${item._id}`);
  };

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Successful sign out"))
      .catch((error) => console.error("Failed to sign out", error));
  };

  const links = (
    <>
      <li>
        <Link to="/" className="text-white hover:text-blue-400">
          Home
        </Link>
      </li>
      <li>
        <Link to="/shopAllProducts" className="text-white hover:text-blue-400">
          Shop All Products
        </Link>
      </li>
      <li>
        {" "}
        <Link
          to="/my-recommendations"
          className="text-white hover:text-blue-400"
        >
          My Recommendations
        </Link>
      </li>
      <li>
        <Link
          to="/recommendations-for-me"
          className="text-white hover:text-blue-400"
        >
          Recommendations For Me
        </Link>
      </li>
      <li>
        <Link to="/myFeedbacks" className="text-white hover:text-blue-400">
          My Feedbacks
        </Link>
      </li>
      <li>
        <Link to="/query-details" className="text-white hover:text-blue-400">
          User Concerns
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar px-4 shadow-md max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-y-4">
      {/* Navbar Start */}
      <div className="navbar-start w-full lg:w-auto flex justify-between items-center">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {links}
            {!user?.email && (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-blue-400">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-white hover:text-blue-400"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 drop-shadow-[0_0_10px_blue] brightness-150"
          />
          <span className="text-white text-lg font-bold">
            SmartPickr<span className="text-blue-500">.</span>
          </span>
        </Link>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal space-x-4">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end w-full lg:flex-1 flex flex-wrap lg:flex-nowrap justify-end items-center gap-4 md:gap-20 lg:gap-8">
        {/* Search Box */}
        <div className="relative w-full sm:w-72 md:w-96 lg:w-[400px]">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            className="input w-full pr-12 bg-blue-500/20 backdrop-blur-md placeholder-white text-white rounded-md focus:ring-1 focus:ring-blue-400 py-2 sm:py-2.5 md:py-3 "
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg border w-full z-50 max-h-60 overflow-y-auto text-black rounded-md">
              {suggestions.map((item) => (
                <li
                  key={item._id}
                  onClick={() => handleSelectSuggestion(item)}
                  className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-100"
                >
                  <img
                    src={item.ProductImageURL}
                    alt=""
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium text-sm">{item.ProductName}</p>
                    <p className="text-green-600 text-xs">
                      BDT {item.ProductPrice}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <CgSearch
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer hover:text-blue-400 text-xl sm:text-2xl"
          />
        </div>

        {/* Profile Section */}
        {user?.email ? (
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL}
                  alt="User"
                />
                <p className="text-sm hidden sm:block">{user.displayName}</p>
              </div>
            ) : (
              <CgProfile className="cursor-pointer hover:text-blue-400 text-xl" />
            )}

            <button
              onClick={handleSignOut}
              className="btn btn-sm text-white bg-blue-500 hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:text-blue-400 text-sm">
            Login
          </Link>
        )}

        {/* Wishlist Icon */}
        <CgHeart className="cursor-pointer hover:text-blue-400 text-xl" />

        {/* Cart */}
        <div className="relative cursor-pointer flex items-center gap-1">
          <CgShoppingCart className="text-2xl" />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
          <span className="text-sm">$0</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
