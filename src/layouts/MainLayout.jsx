import React from "react";
import Navbar from "../pages/shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../pages/shared/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
