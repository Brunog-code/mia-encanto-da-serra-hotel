import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface IPrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { user, loading } = useAuth()!;

  //Enquanto estiver carregando, exibe um loading
  if (loading) return <p className="p-2 text-xl">Carregando...</p>;
  if (!user) return <Navigate to="/login" replace />;

  //Se estiver logado, renderiza o children
  return <>{children}</>;
};
