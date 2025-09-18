import { useState, useEffect, useRef } from "react";
import { Navbar, Footer } from "@/components";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar ref={navbarRef} />

      {/* Main content */}
      <main style={{ marginTop: navbarHeight + 10 }} className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
