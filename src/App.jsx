import React, { useState } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Sidebar from "./features/User/Sidebar";
import SingleBugReport from "./features/User/SingleReport";
import MultipleBugReports from "./features/User/MultipleBugReport";
import HomePage from "./features/User/HomePage";



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
