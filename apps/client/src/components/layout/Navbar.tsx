import { useState, useEffect } from "react";
import clsx from "clsx";
import { forwardRef } from "react";
import { Drawer, List, ListItem, ListItemButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, scrollSpy } from "react-scroll";

export const Navbar = forwardRef<HTMLHeadingElement, {}>((_, ref) => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidthMd, setWindowWidthMd] = useState(window.innerWidth >= 768);

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

        {/* Navbar mobile and desktop */}
        <nav className="w-full flex flex-col">
          {/* Botão mobile */}
          <div className=" self-start">
            <button
              className="flex md:hidden text-2xl cursor-pointer"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {drawerOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Collapse mobile */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <List sx={{ width: 250 }}>
              {menu.map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setDrawerOpen(false)}>
                    <Link
                      to={text}
                      smooth={true}
                      duration={500}
                      offset={-80}
                      spy={true}
                      className="w-full block p-2"
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
      </div>
    </header>
  );
});
