import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";
import { Home, LoginRegister } from "@/pages";
import { AuthLayout } from "@/layouts/AuthLayout";

export const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <LoginRegister /> }],
  },

  { path: "*", element: <Navigate to="/" /> },
]);
