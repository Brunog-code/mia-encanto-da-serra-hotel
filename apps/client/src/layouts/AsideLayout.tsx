import { Outlet } from "react-router-dom";
import { NavbarAsideLayout, FooterAsideLayout } from "@/components";

export const AsideLayout = () => {
  return (
    <div>
      <header>
        <NavbarAsideLayout />
      </header>

      <main className="bg-bistre-300 w-full h-auto min-h-screen text-white-gost-500">
        <Outlet />
      </main>

      <footer>
        <FooterAsideLayout />
      </footer>
    </div>
  );
};
