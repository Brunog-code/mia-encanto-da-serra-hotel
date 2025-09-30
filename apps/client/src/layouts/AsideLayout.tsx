import { Outlet } from "react-router-dom";
import { NavbarAsideLayout } from "@/components/layout/NavbarAsideLayout";

export const AsideLayout = () => {
  return (
    <div>
      <NavbarAsideLayout />

      <main className="bg-bistre-300 w-full h-auto min-h-screen text-white-gost-500">
        <Outlet />
      </main>
    </div>
  );
};
