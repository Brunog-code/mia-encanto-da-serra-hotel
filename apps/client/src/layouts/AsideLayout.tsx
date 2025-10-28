import { Outlet } from "react-router-dom";
import { NavbarAsideLayout, FooterAsideLayout } from "@/components";

export const AsideLayout = () => {
  return (
    <div>
      <header>
        <NavbarAsideLayout />
      </header>

      <main className="flex justify-center bg-bistre-300 w-full min-h-screen overflow-x-hidden text-white-gost-500">
        <div className="w-full max-w-[1920px]">
          <Outlet />
        </div>
      </main>

      <footer>
        <FooterAsideLayout />
      </footer>
    </div>
  );
};
