import { useState } from "react";
import { Link } from "react-router-dom";

const SingleBugReport = () => {
  const [bug, setBug] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/bugs/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bug),
      });
      const result = await response.json();
      console.log("Single Bug Submission Response: ", result);
      alert("Bug report submitted successfully!");
    } catch (error) {
      console.error("Error submitting bug report: ", error);
      alert("An error occurred while submitting the bug report.");
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
        Submit Bug
      </button>
    </form>
  );
};

export default SingleBugReport;
