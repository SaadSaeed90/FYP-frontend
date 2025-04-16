import React from "react";
import { HiDocumentReport } from "react-icons/hi";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-full bg-white p-8 overflow-y-auto font-serif">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-4 mb-4">
          <HiDocumentReport className="text-navy text-6xl" />
          <span className="font-bold text-3xl">Bug Analyzer</span>
        </div>
        <p className="text-gray-700 text-lg text-center max-w-2xl">
          Welcome to Bug Analyzer! Use this app to analyze and categorize bug
          reports effectively. Select one of the options from the sidebar to get
          started.
        </p>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex gap-4 mb-12">
        <Link
          className="bg-navy text-white py-3 px-8 rounded hover:bg-navy-light shadow-md"
          to="/single"
        >
          Analyze Single Bug
        </Link>
        <Link
          className="bg-navy text-white py-3 px-8 rounded hover:bg-navy-light shadow-md"
          to="/multiple"
        >
          Analyze Multiple Bugs
        </Link>
      </div>

      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-navy mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">
              Individual Analysis
            </h3>
            <p className="text-gray-700">
              Analyze single bug reports with detailed insights and severity
              classification.
            </p>
          </div>
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">Bulk Support</h3>
            <p className="text-gray-700">
              Upload CSV or Excel files to process multiple bug reports
              simultaneously.
            </p>
          </div>
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">
              Model-Powered Insights
            </h3>
            <p className="text-gray-700">
              Utilize a trained model to prioritize and categorize issues
              effectively based on historical data.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-navy mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">Step 1</h3>
            <p className="text-gray-700">
              Upload your bug reports as a single file or in bulk using
              supported file formats.
            </p>
          </div>
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">Step 2</h3>
            <p className="text-gray-700">
              Let our trained model analyze the content to classify severity
              levels and provide insights.
            </p>
          </div>
          <div className="p-8 min-h-40 bg-gray-50 shadow-lg rounded-lg flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-navy">Step 3</h3>
            <p className="text-gray-700">
              Receive actionable reports to help prioritize and manage bugs
              efficiently.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
