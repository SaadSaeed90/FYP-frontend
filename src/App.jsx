import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import axios from "axios";
import Sidebar from "./features/User/Sidebar";
import SingleBugReport from "./features/User/SingleReport";
import MultipleBugReports from "./features/User/MultipleBugReport";
import HomePage from "./features/User/HomePage";

// const App = () => {
//   const [singleInput, setSingleInput] = useState({
//     title: "",
//     description: "",
//   });
//   const [fileInput, setFileInput] = useState(null);
//   const [result, setResult] = useState(null);

//   const handleSingleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "http://localhost:5000/api/predict-single",
//       singleInput
//     );
//     setResult(response.data);
//   };

//   const handleFileSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("file", fileInput);

//     const response = await axios.post(
//       "http://localhost:5000/api/predict-batch",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     const blob = new Blob([response.data], { type: fileInput.type });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `output.${fileInput.type.split("/")[1]}`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//   };

//   return (
//     <div>
//       <h1>Bug Report Severity Analyzer</h1>

//       <form onSubmit={handleSingleSubmit}>
//         <h2>Single Bug Report</h2>
//         <input
//           type="text"
//           placeholder="Bug Report Title"
//           value={singleInput.title}
//           onChange={(e) =>
//             setSingleInput({ ...singleInput, title: e.target.value })
//           }
//         />
//         <textarea
//           placeholder="Bug Report Description"
//           value={singleInput.description}
//           onChange={(e) =>
//             setSingleInput({ ...singleInput, description: e.target.value })
//           }
//         ></textarea>
//         <button type="submit">Predict</button>
//       </form>

//       {result && (
//         <div>
//           <h3>Prediction Result</h3>
//           <p>Title: {result.title}</p>
//           <p>Description: {result.description}</p>
//           <p>Severity: {result.severity}</p>
//         </div>
//       )}

//       <form onSubmit={handleFileSubmit}>
//         <h2>Batch Bug Report</h2>
//         <input type="file" onChange={(e) => setFileInput(e.target.files[0])} />
//         <button type="submit">Upload and Predict</button>
//       </form>
//     </div>
//   );
// };

// export default App;

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar setActiveTab={() => {}} />
      <div className="flex-1 bg-white overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />, // Wrap all routes with the Layout component
      children: [
        {
          element: <HomePage />,
          path: "/",
        },
        {
          element: <SingleBugReport />,
          path: "/single",
        },
        {
          element: <MultipleBugReports />,
          path: "/multiple",
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
