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
    <div className="border border-gray-500 border-t-gray-500 border-b-gray-500 border-l-black border-r-black">
      <div className="navbar px-4 shadow-md max-w-[1800px] mx-auto ">
        <div className="navbar-start">
          <div className="dropdown lg:hidden ">
            <button tabIndex={0} className="btn btn-ghost ">
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
                    <Link
                      to="/login"
                      className="text-white hover:text-blue-400"
                    >
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
          <div className="navbar-start flex items-center space-x-6">
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
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal space-x-4">{links}</ul>
            </div>
          </div>
        </div>

        <div className="navbar-end space-x-4 text-xl">
          <div className="relative w-full max-w-xs ">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={handleSearchChange}
              className="input w-full bg-blue-500/20 backdrop-blur-md placeholder-white text-white rounded-md focus:ring-1 focus:ring-blue-400"
            />
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute bg-white shadow-lg border w-full z-50 max-h-60 overflow-y-auto text-black">
                {suggestions.map((item) => (
                  <li
                    key={item._id}
                    onClick={() => handleSelectSuggestion(item)}
                    className="flex gap-3 items-center p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <img
                      src={item.ProductImageURL}
                      alt=""
                      className="w-10 h-10 object-cover"
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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer hover:text-blue-400"
            />
          </div>

          {user?.email ? (
            <>
              {user?.photoURL ? (
                <div>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.photoURL}
                    alt="User"
                  />
                  <p className="text-sm">{user.displayName}</p>
                </div>
              ) : (
                <CgProfile className="cursor-pointer hover:text-blue-400" />
              )}

              <button
                onClick={handleSignOut}
                className="btn btn-sm ml-2 text-white bg-blue-500 hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-400 text-sm">
              Login
            </Link>
          )}
          <CgHeart className="cursor-pointer hover:text-blue-400" />
          <div className="relative cursor-pointer">
            <CgShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
            <span className="ml-1 text-sm">$0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
