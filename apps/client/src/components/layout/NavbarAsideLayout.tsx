import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import clsx from "clsx";

export const NavbarAsideLayout = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  //context
  const { user, logout } = useAuth();

  const onSubmitLogout = () => {
    logout();
    toast.success("Desconectado com sucesso!");
    navigate("/");
  };

  return (
    <div>
      <header className="z-50 relative flex justify-center bg-white-gost-500 shadow-md p-4 w-full">
        <div className="top-6 left-4 absolute">
          <button
            onClick={() => navigate(-1)}
            className="flex justify-center items-center bg-golden-500 hover:bg-golden-600 p-1 rounded-md font-semibold text-white-gost-500 transition-all duration-300 cursor-pointer"
          >
            <ArrowBackIcon fontSize="large" />
            <span className="ml-1">Voltar</span>
          </button>
        </div>
        <div>
          <Link to="/">
            <img src="/images/logo-hotel.png" width={130} alt="Logo-hotel" />
          </Link>
        </div>

        <div className="top-6 right-10 absolute flex flex-col justify-center items-center rounded-md">
          <div className="relative flex flex-col justify-center items-center">
            {user && (
              <span className="text-bistre-300">
                {isMobile ? "" : "Olá, "}
                <span className="font-semibold text-sm md:text-base">
                  {user.name}
                </span>
              </span>
            )}
            <div
              className="relative cursor-pointer"
              onClick={() => setShowDiv(!showDiv)}
            >
              <AccountCircle fontSize="large" className="text-golden-400" />
              <KeyboardArrowDownIcon className="-bottom-1 left-6 absolute ml-1 text-golden-500" />
            </div>
          </div>

          {showDiv && (
            <div
              className={clsx(
                "top-full absolute flex flex-col gap-1 bg-white mt-1 p-2 border border-golden-400 rounded-md text-center",
                !user ? "-left-10" : "left-7"
              )}
            >
              {user ? (
                <>
                  <Link
                    to="/minhas-reservas"
                    className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer"
                  >
                    Reservas
                  </Link>
                  <span
                    className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer"
                    onClick={onSubmitLogout}
                  >
                    Sair
                  </span>
                </>
              ) : (
                <Link
                  to={`/login?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                  className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md font-semibold text-white transition-all duration-300 cursor-pointer"
                >
                  Entrar
                </Link>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
