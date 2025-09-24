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
import { Button } from "@/components";

export const Navbar = forwardRef<HTMLHeadingElement, {}>((_, ref) => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidthMd, setWindowWidthMd] = useState(window.innerWidth >= 768);
  const [showDiv, setShowDiv] = useState(false);

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

  return (
    <header
      ref={ref}
      className={`w-full z-50 fixed bg-white-gost-500 hover:opacity-100 top-0 transition-all duration-300 p-2 ${
        scroll ? "opacity-[85%]" : "opacity-100"
      }`}
    >
      <div
        className={clsx(
          "w-full flex justify-between items-center max-w-6xl mx-auto px-4 relative",
          windowWidthMd ? "flex-col" : "flex-row-reverse"
        )}
      >
        {/* Logo */}
        <div>
          <img src="/images/logo-hotel.png" width={150} alt="Logo-hotel" />
        </div>

        {/* container Navbar mobile and desktop */}
        <nav className="w-full flex flex-col">
          {/* Botão mobile */}
          <div className=" self-start">
            <button
              className="flex md:hidden text-2xl cursor-pointer"
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
                background: "linear-gradient(to bottom, #5a4030, #3d2b1f)", // cor de fundo
                width: 250,
                color: "white", // cor do texto
              },
            }}
          >
            <div className="pt-4 w-full flex flex-col space-y-4 justify-center items-center">
              <IconButton className="self-end " onClick={() => setDrawerOpen(false)}>
                <CloseIcon className="text-white" />
              </IconButton>
              <AccountCircle
                sx={{ fontSize: 50 }} // tamanho em pixels
                className="text-white-gost-400"
              />
              <Button px="px-3" py="py-2">
                Entrar
              </Button>
              <hr className="w-[80%] text-white-gost-600 opacity-50" />
            </div>
            <List sx={{ width: 250 }}>
              {menu.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    sx={{
                      "&:hover": {
                        backgroundColor: "#b08c72", // cor de fundo ao passar o mouse
                        color: "white", // muda a cor do texto se quiser
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
                      className="w-full block p-2"
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
          <div className="hidden md:flex w-full flex-col mt-2 text-golden-600 font-semibold ">
            <div className="border-t border-b border-dark-600 w-full">
              <ul className="flex justify-center space-x-6">
                {menu.map((text) => (
                  <li
                    className="p-2 rounded-md hover:bg-golden-400 hover:text-white cursor-pointer transition-all duration-300"
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

        <div className="rounded-md hidden md:flex flex-col justify-center items-center absolute top-2 right-5">
          <div
            className="relative cursor-pointer"
            onClick={() => setShowDiv(!showDiv)}
          >
            <AccountCircle fontSize="large" className="text-golden-400" />
            <KeyboardArrowDownIcon className="text-golden-500 ml-1 absolute -bottom-1 left-6" />
          </div>
          {showDiv && (
            <div className="absolute top-full -left-7 mt-1 bg-white border border-golden-400 rounded-md p-2 flex flex-col text-center gap-1">
              <button className="text-white bg-golden-400 hover:bg-golden-500 rounded-md p-1 transition-all duration-300 cursor-pointer font-semibold">
                Entrar
              </button>
              {/* <span className="text-white bg-golden-400 hover:bg-golden-500 rounded-md p-1 transition-all duration-300 cursor-pointer">
                Minhas reservas
              </span>
              <span className="text-white bg-golden-400 hover:bg-golden-500 rounded-md p-1 transition-all duration-300 cursor-pointer">
                Sair
              </span> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
