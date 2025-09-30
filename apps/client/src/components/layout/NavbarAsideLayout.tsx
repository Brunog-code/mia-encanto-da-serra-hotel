import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NavbarAsideLayout = () => {
  const [showDiv, setShowDiv] = useState(false);

  const navigate = useNavigate();

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
          <img src="/images/logo-hotel.png" width={130} alt="Logo-hotel" />
        </div>

        <div className="top-6 right-10 absolute flex flex-col justify-center items-center rounded-md">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowDiv(!showDiv)}
          >
            <AccountCircle fontSize="large" className="text-golden-400" />
            <KeyboardArrowDownIcon className="-bottom-1 left-6 absolute ml-1 text-golden-500" />
          </div>
          {showDiv && (
            <div className="top-full -left-7 absolute flex flex-col gap-1 bg-white mt-1 p-2 border border-golden-400 rounded-md text-center">
              <Link
                to="/login"
                className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md font-semibold text-white transition-all duration-300 cursor-pointer"
              >
                Entrar
              </Link>
              {/* <span className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer">
                Minhas reservas
              </span>
              <span className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer">
                Sair
              </span> */}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
