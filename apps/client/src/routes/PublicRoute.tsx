import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface IPublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: IPublicRouteProps) => {
  const { user, loading } = useAuth()!;

  //Enquanto estiver carregando, exibe um loading ('segura o proximo passo enquanto verifica o token')
  //se tiver usuario logado, redireciona para a home
  if (loading) return <p className="p-2 text-xl">Carregando...</p>;
  if (user) return <Navigate to="/" replace />;

  //Se estiver logado, renderiza o children
  return <>{children}</>;
};
