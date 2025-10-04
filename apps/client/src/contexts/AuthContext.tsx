import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { api } from "@/lib/axios";

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAuthProvider {
  children: ReactNode;
}

interface IAuthContext {
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  user: IUser | null;
  token: string | null;
}

//1-criar o context
const AuthContext = createContext<IAuthContext | null>(null);

//2-cria o provider
export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true); //“segura” o PrivateRoute enquanto o React espera o token ser verificado e o usuário ser carregado do backend

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const login = (token: string) => {
    if (token) {
      localStorage.setItem("token", token);
    }
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

//3-hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
