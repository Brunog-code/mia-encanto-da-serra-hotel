import { useState, useEffect } from "react";
import clsx from "clsx";
import { forwardRef } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Navbar = forwardRef<HTMLHeadingElement, {}>((_, ref) => {
  const [scroll, setScroll] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [windowWidthMd, setWindowWidthMd] = useState(window.innerWidth >= 768);

  // Detecta scroll para mudar opacidade
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detecta resize da tela
  useEffect(() => {
    const handleResize = () => {
      setWindowWidthMd(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setDrawerOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      ref={ref}
      className={`w-full z-50 fixed bg-white-gost-500 top-0 transition-all duration-300 p-2 ${
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
              {["Sobre", "Quartos", "Serviços", "Contato"].map((text) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          {/* Navbar desktop */}
          <div className="hidden md:flex w-full flex-col mt-2 text-golden-600 font-semibold ">
            <div className="border-t border-b border-dark-600 w-full">
              <ul className="flex justify-center space-x-6  p-2">
                <li>Inicio</li>
                <li>Sobre</li>
                <li>Quartos</li>
                <li>Experiências</li>
                <li>Galeria</li>
                <li>Contato</li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
});
