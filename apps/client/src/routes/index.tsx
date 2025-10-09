import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, AsideLayout, AppLayout } from "@/layouts";
import {
  ConfirmReservation,
  ForgotPassword,
  Home,
  LoginRegister,
  MyReservations,
  ResetPassword,
  RoomDetails,
} from "@/pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        path: "",
        element: (
          <PublicRoute>
            <LoginRegister />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/esqueci-senha",
    element: <AuthLayout />,
    children: [{ path: "", element: <ForgotPassword /> }],
  },
  {
    path: "/redefinir-senha/:token",
    element: <AuthLayout />,
    children: [{ index: true, element: <ResetPassword /> }],
  },
  {
    path: "/quarto/:id",
    element: <AsideLayout />,
    children: [{ path: "", element: <RoomDetails /> }],
  },
  {
    path: "/minhas-reservas",
    element: <AsideLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <MyReservations />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/confirmar-reserva/:id",
    element: <AsideLayout />,
    children: [
      {
        path: "",
        element: (
          <PrivateRoute>
            <ConfirmReservation />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: "*", element: <Navigate to="/" /> },
]);
