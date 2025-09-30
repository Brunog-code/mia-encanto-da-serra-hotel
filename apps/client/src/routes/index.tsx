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

export const AppRouters = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "", element: <LoginRegister /> }],
  },
  {
    path: "/esqueci-senha",
    element: <AuthLayout />,
    children: [{ path: "", element: <ForgotPassword /> }],
  },
  {
    path: "/redefinir-senha",
    element: <AuthLayout />,
    children: [{ path: "", element: <ResetPassword /> }],
  },
  {
    path: "/quarto/:id",
    element: <AsideLayout />,
    children: [{ path: "", element: <RoomDetails /> }],
  },
  {
    path: "/minhas-reservas",
    element: <AsideLayout />,
    children: [{ path: "", element: <MyReservations /> }],
  },
  {
    path: "/confirmar-reserva",
    element: <AsideLayout />,
    children: [{ path: "", element: <ConfirmReservation /> }],
  },

  { path: "*", element: <Navigate to="/" /> },
]);
