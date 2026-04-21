import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Page/Navbar";

function Rootlayout() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <div className="w-64 h-full bg-gray-100">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1  bg-gray-500">
        <Outlet />
      </div>

    </div>
  );
}

export default Rootlayout;