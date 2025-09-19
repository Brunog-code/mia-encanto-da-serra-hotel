import { useEffect, useState } from "react";

export const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);

  }, []);

  if (!isVisible) return null;

  return (
  <button className="bg-bistre-500 rounded-full">
    ScrollButton
    </button>
  )

};
