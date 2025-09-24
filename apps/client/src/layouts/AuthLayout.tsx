import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <main className="flex-1 w-full overflow-x-hidden min-h-screen">
      <Outlet />
    </main>
  );
};
