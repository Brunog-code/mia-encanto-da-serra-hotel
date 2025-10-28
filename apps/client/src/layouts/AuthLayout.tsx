import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="flex-1 mx-auto w-full max-w-screen-2xl overflow-x-hidden">
      <Outlet />
    </main>
  );
};
