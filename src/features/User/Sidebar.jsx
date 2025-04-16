import React, { useState } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { FaHome, FaBug, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ setActiveTab }) => {
  const [isAnalyzeDropdownOpen, setIsAnalyzeDropdownOpen] = useState(false);

  return (
    <div className="h-screen w-64 bg-gray-100 shadow-md p-4 font-serif sm:block hidden">
      <div className="flex items-center mb-8">
        <HiDocumentReport className="text-navy text-6xl" />
        <span className="font-bold text-xl">Bug Analyzer</span>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          onClick={() => setActiveTab("home")}
          to="/"
          className="flex items-center bg-navy text-white py-2 px-4 rounded hover:bg-navy-light"
        >
          <FaHome className="mr-2" /> Home
        </Link>

        <div>
          <button
            onClick={() => setIsAnalyzeDropdownOpen(!isAnalyzeDropdownOpen)}
            className="flex items-center justify-between bg-navy text-white py-2 px-4 rounded hover:bg-navy-light w-full"
          >
            <span className="flex items-center">
              <FaBug className="mr-2" /> Analyze
            </span>
            {isAnalyzeDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isAnalyzeDropdownOpen && (
            <div className="flex flex-col gap-2 mt-2 pl-4">
              <NavLink
                onClick={() => setActiveTab("single")}
                to="/single"
                className="bg-gray-200 text-navy py-2 px-4 rounded hover:bg-gray-300"
              >
                Single Bug Report
              </NavLink>
              <NavLink
                onClick={() => setActiveTab("multiple")}
                to="/multiple"
                className="bg-gray-200 text-navy py-2 px-4 rounded hover:bg-gray-300"
              >
                Multiple Bug Reports
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
