import { useState, useEffect } from "react";
import clsx from "clsx";
import { forwardRef } from "react";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, scrollSpy } from "react-scroll";
import AccountCircle from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Navbar = forwardRef<HTMLHeadingElement, {}>((_, ref) => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidthMd, setWindowWidthMd] = useState(window.innerWidth >= 768);
  const [showDiv, setShowDiv] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  //context auth
  const { user, logout } = useAuth();

  //atualiza scrollSpy na primeira render
  useEffect(() => {
    scrollSpy.update();
  }, []);

  // Detecta scroll para mudar opacidade
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detecta resize da tela para alternar entre mobile e desktop
  useEffect(() => {
    const handleResize = () => {
      setWindowWidthMd(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setDrawerOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Itens do menu
  const menu = [
    "Inicio",
    "Sobre",
    "Quartos",
    "Estrutura",
    "Galeria",
    "Contato",
  ];

  const onSubmitLogout = () => {
    logout();
    toast.success("Desconectado com sucesso!");
    navigate("/");
  };

  return (
    <header
      ref={ref}
      className={`w-full z-50 fixed bg-white-gost-500 hover:opacity-100 top-0 transition-all duration-300 p-2 ${
        scroll ? "opacity-[85%]" : "opacity-100"
      }`}
    >
      <div
        className={clsx(
          "relative flex justify-between items-center mx-auto px-4 w-full max-w-6xl",
          windowWidthMd ? "flex-col" : "flex-row-reverse"
        )}
      >
        {/* Logo */}
        <div>
          <img src="/images/logo-hotel.png" width={150} alt="Logo-hotel" />
        </div>

        {/* container Navbar mobile and desktop */}
        <nav className="flex flex-col w-full">
          {/* Botão mobile */}
          <div className="self-start">
            <button
              className="md:hidden flex text-2xl cursor-pointer"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </button>
          </div>

          {/* Collapse mobile */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                background: "linear-gradient(to bottom, #5a4030, #3d2b1f)", //cor de fundo
                width: 250,
                color: "white", //cor do texto
                overflowX: "hidden",
              },
            }}
          >
            <div className="flex flex-col justify-center items-center space-y-4 pt-4 w-full">
              <IconButton
                className="self-end"
                onClick={() => setDrawerOpen(false)}
              >
                <CloseIcon className="text-white" />
              </IconButton>
              <AccountCircle
                sx={{ fontSize: 65 }} //tamanho em pixels
                className="text-white-gost-400"
              />
              {user ? (
                <div className="flex flex-col gap-2 w-[90%] text-center">
                  <span className="text-white-gost-500">
                    Olá, <span className="font-semibold">{user.name}</span>
                  </span>
                  <RouterLink
                    to="/minhas-reservas"
                    className="bg-golden-500 hover:bg-golden-600 px-3 py-2 rounded-md font-semibold text-white-gost-400 transition-all duration-300 cursor-pointer bg"
                  >
                    Reservas
                  </RouterLink>
                  <span
                    className="bg-golden-500 hover:bg-golden-600 px-3 py-2 rounded-md font-semibold text-white-gost-400 transition-all duration-300 cursor-pointer bg"
                    onClick={onSubmitLogout}
                  >
                    Sair
                  </span>
                </div>
              ) : (
                <>
                  <RouterLink
                    to={`/login?redirect=${encodeURIComponent(
                      location.pathname
                    )}`}
                    className="bg-golden-500 hover:bg-golden-600 px-4 py-3 rounded-md font-semibold text-white-gost-400 transition-all duration-300 cursor-pointer bg"
                  >
                    Entrar
                  </RouterLink>
                </>
              )}

              <hr className="opacity-50 w-[80%] text-white-gost-600" />
            </div>
            <List sx={{ width: 250 }}>
              {menu.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#b08c72",
                        color: "white",
                      },
                    }}
                  >
                    <Link
                      key={index}
                      to={text}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      spy={true}
                      className="block p-2 w-full"
                      onClick={() => setDrawerOpen(false)}
                    >
                      {text}
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Navbar desktop */}
          <div className="hidden md:flex flex-col mt-2 w-full font-semibold text-golden-600">
            <div className="border-dark-600 border-t border-b w-full">
              <ul className="flex justify-center space-x-6">
                {menu.map((text) => (
                  <li
                    className="hover:bg-golden-400 p-2 rounded-md hover:text-white transition-all duration-300 cursor-pointer"
                    key={text}
                  >
                    <Link
                      key={text}
                      to={text}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      spy={true}
                      className="p-2 rounded-md"
                      activeClass="text-bistre-600"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        <div className="hidden top-2 right-5 absolute md:flex flex-col justify-center items-center">
          <div className="relative flex flex-col justify-center items-center">
            {user && (
              <span className="text-bistre-300">
                Olá, <span className="font-semibold">{user.name}</span>
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
              className={`top-full ${
                user ? "-left-1" : "-left-10"
              } absolute flex flex-col gap-1 bg-white mt-1 p-2 border border-golden-400 rounded-md text-center`}
            >
              {user ? (
                <>
                  <RouterLink
                    to="/minhas-reservas"
                    className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer"
                  >
                    Reservas
                  </RouterLink>
                  <span
                    className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md text-white transition-all duration-300 cursor-pointer"
                    onClick={onSubmitLogout}
                  >
                    Sair
                  </span>
                </>
              ) : (
                <RouterLink
                  to={`/login?redirect=${encodeURIComponent(
                    location.pathname
                  )}`}
                  className="bg-golden-400 hover:bg-golden-500 p-1 rounded-md font-semibold text-white transition-all duration-300 cursor-pointer"
                >
                  Entrar
                </RouterLink>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
