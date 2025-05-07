import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SingleBugReport = () => {
  const [bug, setBug] = useState({ title: "", description: "" });
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(""); // reset previous prediction

    try {
      // Call the prediction API with the bug description
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        text: bug.description,
      });

      console.log("Prediction Response: ", response.data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error getting prediction: ", error);
      alert("An error occurred while predicting severity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-8 font-serif" onSubmit={handleSubmit}>
      <Link to="/" className="text-navy-light underline">
        &#129044; {"      "} back to home
      </Link>
      <h2 className="text-2xl font-bold my-4">Single Bug Report</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={bug.title}
          onChange={(e) => setBug({ ...bug, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
          value={bug.description}
          onChange={(e) => setBug({ ...bug, description: e.target.value })}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-navy text-white py-2 px-4 rounded hover:bg-navy-light"
      >
        Predict Severity
      </button>

      {/* Show loader while prediction is loading */}
      {loading && (
        <div className="mt-4 text-blue-600 font-medium">Predicting...</div>
      )}

      {/* Display prediction result */}
      {prediction && !loading && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
          <p className="text-green-800 font-bold">
            Predicted Severity: {prediction}
          </p>
        </div>
      )}
    </form>
  );
};

export default SingleBugReport;
