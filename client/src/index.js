import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import MonitorTrash from "./MonitorTrash";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "monitor",
    element: <MonitorTrash />
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);