import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/pages" className="text-white hover:text-blue-400">
          Pages
        </Link>
      </li>
      <li>
        <Link to="/shop" className="text-white hover:text-blue-400">
          Shop
        </Link>
      </li>
      <li>
        <Link to="/blog" className="text-white hover:text-blue-400">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/landing" className="text-white hover:text-blue-400">
          Landing
        </Link>
      </li>
    </>
  
  );

  return (
    <div className="navbar bg-black text-white px-4 shadow-md">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost text-white">
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
        <div className="navbar-start">
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
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal space-x-4">{links}</ul>
      </div>

      <div className="navbar-end space-x-4 text-xl">
        <CgSearch className="cursor-pointer hover:text-blue-400" />

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
  );
};

export default Navbar;
